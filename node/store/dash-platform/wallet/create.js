const Dash = require('dash');

const read = async (mnemonic) => {
    const client = new Dash.Client({
        network: 'testnet',
        wallet: {
            mnemonic: mnemonic || null, // If null Generate New Wallet
            offlineMode: true,
        },
    });

    const account = await client.getWalletAccount();

    return {
        address: account.getUnusedAddress().address,
        mnemonic: client.wallet.exportWallet()
    };
};

module.exports = read;
