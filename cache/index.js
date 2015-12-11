/**
 * Created by Carlis on 2015/12/2.
 */
var debug = require('debug')('5lym:job/cache');
var redisClient = require('../tools/redis-client');

redisClient.set("string key", "string val");