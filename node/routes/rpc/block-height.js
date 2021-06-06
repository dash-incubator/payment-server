const rpc = require.main.require('./store/rpc');


module.exports = function(app) {
    app.get('/block-height', async (req, res) => {
        let data = await rpc.getBlockCount()
            .catch(e => {
                console.log(e);
            });

        res.status(200).send( data );
    });
};
