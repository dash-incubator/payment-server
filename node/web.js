const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const register = {
    contract: require('./store/dash-platform/contract/register'),
    identity: require('./store/dash-platform/identity/create'),
    wallet: require('./store/dash-platform/wallet/create'),
};

require('dotenv').config();

const app = express();
const config = {
    host: '0.0.0.0',
    port: process.env.NODE_PORT || 8080
};


app.use(express.static( path.join(__dirname, 'public') ));
app.use(express.json());
app.use(express.raw({
    limit : '2mb',
    type: 'application/dash-payment'
}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


function load(path) {
    fs.readdirSync(path).forEach(function(file) {
        let filepath = path + '/' + file;

        fs.stat(filepath, function(err,stat) {
            if (stat.isDirectory()) {
                load(filepath);
            }
            else {
                require(filepath)(app);
            }
        });
    });
}

load(path.join(__dirname, 'routes'));


// Setup Dash Platform Information
(async () => {
    let mnemonic = process.env.DASH_MNEMONIC;

    if (!mnemonic) {
        let wallet = await register.wallet();

        console.log(wallet);

        mnemonic = wallet.mnemonic;
        process.env.DASH_MNEMONIC = mnemonic;
    }

    if (!process.env.DASH_IDENTITY) {
        let identity = await register.identity(mnemonic);

        console.log({ identity });

        let contract = await register.contract(identity, mnemonic);

        process.env.DASH_IDENTITY = identity;
        process.env.DASH_CONTRACT_ID = contract['$id'];

        console.log({
            identity: process.env.DASH_IDENTITY,
            contract: process.env.DASH_CONTRACT_ID
        });
    }
})();


app.listen(config.port, config.host);
