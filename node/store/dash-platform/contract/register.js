const Dash = require('dash');
const paymentdata = require('../paymentdata');

let client;

const register = async (id, mnemonic) => {
    client = new Dash.Client({
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
