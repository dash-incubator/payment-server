const Dash = require('dash');

let client;

const update = async (contractId, documentId, identityId, mnemonic, json, uuid) => {
    client = new Dash.Client({
        network: 'testnet',
        wallet: {
            mnemonic,
            unsafeOptions: {
                skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
            },
        },
        apps: {
            metadataContract: {
                contractId
            },
        },
    });

    const { platform } = client;
    const identity = await platform.identities.get(identityId);
    const [document] = await client.platform.documents.get(
        'metadataContract.metadata',
        { where: [['$id', '==', documentId]] },
      );

    document.set('json', JSON.stringify(json));
    document.set('uuid', uuid);

    return platform.documents.broadcast({ replace: [document] }, identity);
};

module.exports = async (contractId, documentId, identityId, mnemonic, json, uuid) => {
    return update(contractId, documentId, identityId, mnemonic, json, uuid)
        .then((d) => d.toJSON())
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};
