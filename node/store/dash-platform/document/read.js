const Dash = require('dash');

let client;

const read = async (contractId, identity) => {
    client = new Dash.Client({
        apps: {
            metadataContract: {
                contractId
            },
        },
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
