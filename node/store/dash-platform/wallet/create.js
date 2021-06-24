const Dash = require('dash');

const read = async (mnemonic) => {
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
            mnemonic: mnemonic || null, // If null Generate New Wallet
            offlineMode: (!mnemonic),
            unsafeOptions: {
                skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
            },
        },
    });

    const account = await client.getWalletAccount();

    return {
        address: account.getUnusedAddress().address,
        balance: {
            confirmed: await account.getConfirmedBalance(),
            total: await account.getTotalBalance()
        },
        mnemonic: client.wallet.exportWallet()
    };
};

module.exports = read;
