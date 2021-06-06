const RpcClient = require('@dashevo/dashd-rpc/promise.js');


let rpc = new RpcClient({
    protocol: 'http',
    user: 'dashrpc',
    pass: 'password',
    host: 'dashd',
    port: 9998
});


module.exports = rpc;
