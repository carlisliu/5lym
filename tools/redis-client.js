/**
 * Created by Carlis on 2015/12/2.
 */
var redis = require('redis');
var config = require('../config');
var debug = require('debug')('5lym:tools/redis-client');

var client;
if (config.redis) {
    if ('auth_pass' in config.redis) {
        if (!config.redis.auth_pass) {
            delete config.redis.auth_pass;
        }
    }
    client = redis.createClient(config.redis);
} else {
    client = redis.createClient();
}

client.on("error", function (err) {
    console.error(err);
    debug(err);
});

module.exports = client;