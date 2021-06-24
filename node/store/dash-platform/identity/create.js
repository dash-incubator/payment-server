const Dash = require('dash');


async function c(client) {
    return client.platform.identities.register()
        .then((d) => d.toJSON())
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
}


const create = async (mnemonic) => {
    const client = new Dash.Client({
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


    const account = await client.getWalletAccount();
    const identities = await account.identities.getIdentityIds();

    let identity = (identities || [])[0];

    if (!identity) {
        identity = await c(client);
        identity = (identity || {}).id;
    }

    return identity;
};


module.exports = create;
