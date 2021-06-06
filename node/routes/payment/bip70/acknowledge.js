const Dash = require('dash');
const PaymentProtocol = require('@dashevo/dashcore-payment-protocol');
const document = {
    create: require.main.require('./store/dash-platform/document/create')
};
const payments = require.main.require('./store/payments');
const rpc = require.main.require('./store/rpc');


async function broadcast(rawtransaction) {
    let error = {},
        response = await rpc.sendRawTransaction(rawtransaction)
            .catch(e => {
                error = e;
            });

    return {
        error: error.code || 0,
        result: (response || {}).result || null
    };
}

async function saveOnPlatform(data, uuid) {
    if (data.storage) {
        console.log('Saving to Platform');

        let platform = await document.create(process.env.DASH_CONTRACT_ID, process.env.DASH_IDENTITY, process.env.DASH_MNEMONIC, {
            storage: data.storage,
            uuid
        });

        data.storage = {
            platform,
            storage: data.storage
        };

        console.log('Saved to Platform');
    }

    data.complete = true;

    await payments.set(uuid, data);
}


module.exports = function(app) {
    app.post('/payment/acknowledge/:uuid', async (req, res) => {
        let body = PaymentProtocol.Payment.decode(req.body),
            payment = new PaymentProtocol().makePayment(body),
            transactions = payment.get('transactions') || [],
            uuid = req.params.uuid;

        let data = await payments.get(uuid),
            failed = !data;

        for (let i = 0, n = transactions.length; i < n; i++) {
            if (failed) {
                return res.status(404);
            }

            let rawtransaction = transactions[i].toString('hex'),
                rebroadcast = await broadcast(rawtransaction);

            // If result is not null rebroadcast was successful
            // Error code -27 = Transaction already in block chain
            if ((rebroadcast.result || null) === null || rebroadcast.error === -27) {
                failed = true;
            }
        }

        saveOnPlatform(data, uuid);

        let ack = new PaymentProtocol().makePaymentACK();

        ack.set('payment', payment.message);
        ack.set('memo', 'Thank you for your payment!');

        res
            .set({
                'Content-Type': PaymentProtocol.LEGACY_PAYMENT.BTC.ACK_CONTENT_TYPE,
                'Content-Length': ack.length,
                'Content-Transfer-Encoding': 'binary'
            })
            .status(200)
            .send(ack.serialize());
    });
};
