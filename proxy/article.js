var Article = require('../models').Article,
    //emitter = require('events').EventEmitter,
    User = require('../models').User;


exports.getAllArticles = function (callback) {
    Article.find(function (err, articles) {
        if (err) {
            return callback(err);
        }
        //User.find()
        return callback(null, articles);
    });
};

exports.getArticleById = function (id, callback) {
    Article.findOne({_id: id}, function (err, article) {
        if (err) {
            return callback(err);
        }
        return callback(null, article);
    });
};

exports.saveArticle = function (article, callback) {
    var instance;
    if (article) {
        instance = new Article()
        instance.title = article.title;
        instance.content = article.content;
        instance.save(function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null, instance);
        });
    }
}
