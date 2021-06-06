const contract = {
    paymentdata: {
        properties: {
            storage: {
                type: 'string'
            },
            uuid: {
                type: 'string'
            }
        },
        additionalProperties: false
    }
};

const defaults = {
    storage: 'default',
    uuid: 'default'
};



module.exports = { contract, defaults };
