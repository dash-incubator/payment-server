const payments = require.main.require('./store/payments');


module.exports = function(app) {
    app.get('/payment/info/:uuid', async (req, res) => {
        let data = await payments.get(req.params.uuid);

        res.status(200).send( data );
    });
};
