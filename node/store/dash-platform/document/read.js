const Dash = require('dash');

let client;

const read = async (contractId, identity) => {
    client = new Dash.Client({
        apps: {
            metadataContract: {
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
    });

    let query = {};

    if (identity) {
        query['where'] = [
            ['$ownerId', '==', identity]
        ]
    }

    return client.platform.documents.get('metadataContract.metadata', query);
};

module.exports = async (contractId) => {
    return read(contractId)
        .then((d) => d)
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};
