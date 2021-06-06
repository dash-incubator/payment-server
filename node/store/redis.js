const client = require('async-redis').createClient({
    path: process.env.REDIS_SOCKET,
    password: process.env.REDIS_PASSWORD
});

const hdel = async (bucket, key) => {
    return await client.hdel(bucket, key);
};

const hget = async (bucket, key) => {
    let data = await client.hget(bucket, key);

    if (typeof data === 'string') {
        return JSON.parse(data);
    }

    return {};
};

const hmget = async (bucket, keys) => {
    keys = Array.isArray(keys) ? keys : [keys];

    if (!keys.length) {
        return [];
    }

    let data = await client.hmget(bucket, keys);

    if (Array.isArray(data)) {
        for (let i = 0, n = data.length; i < n; i++) {
            data[i] = JSON.parse(data[i]);
        }

        return data;
    }

    return [];
};

const hmset = async (bucket, values) => {
    if (!Array.isArray(values) || values.length < 2) {
        return;
    }

    for (let i = 0, n = values.length; i < n; i++) {
        if (['number', 'string'].includes(typeof values[i])) {
            continue;
        }

        values[i] = JSON.stringify(values[i]);
    }

    await client.hmset(bucket, ...values);
};

const hset = async (bucket, key, value) => {
    await client.hset(bucket, key, JSON.stringify( value ));
};

const queue = {
    pop: async (queue) => {
        return await client.lpop(`queue:${queue}`);
    },
    push: async (queue, value) => {
        if (typeof value !== 'string') {
            console.error(`Invalid value added to Redis Queue ${value}`);
            return;
        }

        await client.rpush(`queue:${queue}`, value);
    }
};


module.exports = { client, hdel, hget, hmget, hmset, hset, queue };
