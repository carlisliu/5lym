var Article = require('../models').Article,
    User = require('./user'),
    EventProxy = require('eventproxy');

exports.getAllArticles = function (callback) {
    Article.find().sort({'create_at': -1}).exec(function (err, articles) {
        if (err) {
            return callback(err);
        }
        var proxy = new EventProxy();
        proxy.assign('user_found', function (users) {
            var foundUsers = {};
            if (users && users.length) {
                users && users.forEach(function (user) {
                    foundUsers[user.login_name] = user.name;
                });
                articles && articles.forEach(function (article, index) {
                    article.author_id = foundUsers[article.author_id] || '';
                });
            }
            callback(null, articles);
        });
        var ids = [];
        articles.forEach(function (article) {
            ids.push(article.author_id);
        });
        User.getUsersByIds(ids, proxy.done('user_found'));
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
        instance.author_id = article.author_id;
        instance.category_id = article.category_id;
        instance.save(function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null, instance);
        });
    }
}
