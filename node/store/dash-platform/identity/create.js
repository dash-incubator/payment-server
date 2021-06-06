const Dash = require('dash');


async function c(client) {
    return client.platform.identities.register()
        .then((d) => d.toJSON())
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
}


const create = async (mnemonic) => {
    const client = new Dash.Client({
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
