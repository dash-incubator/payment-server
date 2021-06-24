const Dash = require('dash');
const paymentdata = require('../paymentdata');

let client;

const create = async (contractId, identityId, mnemonic, data) => {
    client = new Dash.Client({
        apps: {
            paymentdataContract: {
                contractId
            },
        },
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
        }
    });

    const { platform } = client;
    const identity = await platform.identities.get(identityId);
    const document = await platform.documents.create('paymentdataContract.paymentdata', identity, data);

    return platform.documents.broadcast({ create: [document] }, identity);
};

module.exports = async (contractId, identityId, mnemonic, data = paymentdata.defaults) => {
    return create(contractId, identityId, mnemonic, data = paymentdata.defaults)
        .then((d) => d.toJSON().transitions[0])
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};
