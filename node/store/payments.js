const redis = require('./redis');

const get = async (uuid) => {
    return await redis.hget('payment', uuid);
};

const set = async (uuid, data) => {
    await redis.hset('payment', uuid, data);
};


module.exports = { get, set };
