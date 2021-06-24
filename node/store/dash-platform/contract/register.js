const Dash = require('dash');
const paymentdata = require('../paymentdata');

let client;

const register = async (id, mnemonic) => {
    client = new Dash.Client({
        dapiAddresses: [
            '34.217.23.70:3000',
            '34.222.102.137:3000',
            '34.209.166.42:3000',
            '18.236.128.49:3000',
            '35.163.99.20:3000',
            '34.215.67.224:3000',
            '34.211.244.117:3000'
        ],
        network: 'testnet',
        wallet: {
            mnemonic,
            unsafeOptions: {
                skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
            },
        },
    });

    const { platform } = client;
    const identity = await platform.identities.get(id);

    const contract = await platform.contracts.create(paymentdata.contract, identity);

    // Make sure contract passes validation checks
    const validationResult = await platform.dpp.dataContract.validate(contract);

    // Sign and submit the data contract
    if (validationResult.isValid()) {
        console.log('Validation passed, broadcasting contract..');

        return platform.contracts.broadcast(contract, identity);
    }

    throw validationResult.errors[0];
};


module.exports = async (identity, mnemonic) => {
    return register(identity, mnemonic)
        .then((d) => d.toJSON().dataContract)
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};
