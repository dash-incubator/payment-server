const Dash = require('dash');
const paymentdata = require('../paymentdata');

let client;

const create = async (contractId, identityId, mnemonic, data) => {
    client = new Dash.Client({
        network: 'testnet',
        wallet: {
            mnemonic,
            unsafeOptions: {
                skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
            },
        },
        apps: {
            paymentdataContract: {
                contractId
            },
        },
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
