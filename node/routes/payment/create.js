const payments = require.main.require('./store/payments');
const QRCode = require('qrcode');
const { v4 } = require('uuid');


let decimals = 8;


module.exports = function(app) {
    app.post('/payment/create', async (req, res) => {
        let data = {
                pay: [],
                storage: req.body.storage || false
            },
            errors = [],
            memo = req.body.memo || 'A payment request from the merchant',
            now = Date.now() / 1000 | 0,
            pay = req.body.pay || [],
            uuid = v4();

        // Iterate Through Details
        // - Look for amount and address
        for (let i = 0, n = pay.length; i < n; i++) {
            let { address, amount } = pay[i] || {};

            if (!address || !amount) {
                errors.push(JSON.stringify({ address, amount }) + ' invalid payment information recieved');
            }
            else {
                data.pay.push({
                    address,
                    amount: amount * '1'.padEnd((decimals + 1), 0)
                });
            }
        }

        data.complete = false;
        data.expires = (now + (60 * 15));
        data.memo = memo;
        data.poll = `https://${process.env.DOMAIN}/payment/info/${uuid}`;
        data.qr = await QRCode.toDataURL(`pay:?r=https://${process.env.DOMAIN}/payment/details/${uuid}`);
        data.time = now;

        await payments.set(uuid, data);

        res.status(200).send(errors.length ? errors : data);
    });
};
