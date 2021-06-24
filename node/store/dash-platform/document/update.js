const Dash = require('dash');

let client;

const update = async (contractId, documentId, identityId, mnemonic, json, uuid) => {
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
        wallet: {
            mnemonic,
            unsafeOptions: {
                skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
            },
        }
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
