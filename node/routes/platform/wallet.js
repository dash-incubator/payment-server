const create = require.main.require('./store/dash-platform/wallet/create');


// TEMP: If Service Is Running Their Own DP Contract They Will Need To Register ID/Contract etc.
let wallet;


module.exports = function(app) {
    app.get('/wallet', async (req, res) => {
        if (!wallet) {
            wallet = await create();
        }

        res.status(200).json( wallet );
    });
};
