const rpc = require.main.require('./store/rpc');


module.exports = function(app) {
    app.get('/peer-info', async (req, res) => {
        let data = await rpc.getPeerInfo()
            .catch(e => {
                console.log(e);
            });

        res.status(200).send( data );
    });
};
