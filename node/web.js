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
async function setup() {
    let contract = process.env.DASH_CONTRACT_ID || null,
        identity = process.env.DASH_IDENTITY || null,
        mnemonic = process.env.DASH_MNEMONIC || null,
        wallet = await register.wallet(mnemonic);

    mnemonic = wallet.mnemonic;
    process.env.DASH_MNEMONIC = mnemonic;

    if (wallet.balance.confirmed > 0) {
        if (!identity) {
            identity = await register.identity(mnemonic);
            process.env.DASH_IDENTITY = identity;
        }

        if (!contract && identity) {
            contract = await register.contract(identity, mnemonic);
            process.env.DASH_CONTRACT_ID = contract['$id'];
        }
    }

    console.log({
        contract: process.env.DASH_CONTRACT_ID,
        identity: process.env.DASH_IDENTITY,
        wallet
    });

    if (!contract || !identity) {
        setTimeout(setup, (60 * 1000));
    }
}

setup();


app.listen(config.port, config.host);
