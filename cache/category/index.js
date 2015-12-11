/**
 * Created by Carlis on 2015/12/3.
 */
var redisClient = require('../tools/redis-client');
const ARTICLE = 'carlis_article';

exports.getById = function(id, callback){
    redisClient.hget(ARTICLE, id, callback);
};

exports.get = function(callback){
    redisClient.hkeys(ARTICLE, callback);
};

exports.set = function(articles, callback){
    articles.forEach(function(article){
        redisClient.hset(ARTICLE, article._id, article.content, redisClient.print);
    });
};