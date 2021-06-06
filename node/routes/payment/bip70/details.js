const dashcore = require('dashcore-lib-bip70');
const fs = require('fs');
const path = require('path');
const PaymentProtocol = require('@dashevo/dashcore-payment-protocol');
const payments = require.main.require('./store/payments');
const root = path.dirname(require.main.filename);

let x509 = {
        der:  '', // fs.readFileSync(path.join(root + '/certs/cert.der')),
        priv: ''  // fs.readFileSync(path.join(root + '/certs/privkey.pem'))
    },
    // 'main' || 'test'
    network = 'test';


function createCertificates() {
    let certificates = new PaymentProtocol().makeX509Certificates();

    certificates.set('certificate', [x509.der]);

    return certificates;
}

function createDetails(uuid, data) {
    let { expires, memo, pay, storage, time } = data,
        details = new PaymentProtocol().makePaymentDetails(),
        outputs = [],
        type = network == 'test' ? dashcore.Networks.testnet : dashcore.Networks.mainnet;

    for (let i = 0, n = pay.length; i < n; i++) {
        let address = new dashcore.Address.fromString(pay[i].address, type),
            amount = pay[i].amount,
            output = new PaymentProtocol().makeOutput();

        output.set('amount', amount);
        output.set('script', dashcore.Script.buildPublicKeyHashOut(address).toBuffer());

        outputs.push(output.message);
    }

    details.set('network', network);
    details.set('outputs', outputs);
    details.set('time', time);
    details.set('expires', expires);
    details.set('memo', memo);
    details.set('payment_url', `https://${process.env.DOMAIN}/payment/acknowledge/${uuid}`);
    details.set('merchant_data', Buffer.from( JSON.stringify(storage || {}) ));

    return details;
}

// BUG: For Some Reason SSL Certificate Signing Is Not Working. Used CLoudflare And
// LetsEncrypt SSL Certificates. Verified Validity Of Certificates Using 3rd Party
// SSL Services.
// - Is There Something Wrong With BIP70 Implementation Or Dash Electrum?
function createRequest(certificates, details) {
    let request = new PaymentProtocol().makePaymentRequest();

    request.set('payment_details_version', 1);
    //request.set('pki_type', 'x509+sha256');
    //request.set('pki_data', certificates.serialize());
    request.set('serialized_payment_details', details.serialize());
    //request.sign(x509.priv);

    return request;
}


module.exports = function(app) {
    app.get('/payment/details/:uuid', async (req, res) => {
        let uuid = req.params.uuid,
            data = await payments.get(uuid);

        if (!data || data.complete) {
            return res.status(404);
        }

        let certificates = createCertificates(),
            details = createDetails(uuid, data),
            request = createRequest(certificates, details);

        res
            .set({
                'Content-Type': PaymentProtocol.LEGACY_PAYMENT.BTC.REQUEST_CONTENT_TYPE,
                'Content-Length': request.length,
                'Content-Transfer-Encoding': 'binary'
            })
            .status(200)
            .send(request.serialize());
    });
};
