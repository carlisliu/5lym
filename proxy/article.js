var Article = require('../models').Article,
    User = require('./user'),
    Category = require('./category'),
    EventProxy = require('eventproxy');

exports.getAllArticles = function (callback) {
    Article.find().sort({'create_at': -1}).exec(function (err, articles) {
        if (err) {
            return callback(err);
        }
        var proxy = new EventProxy();
        proxy.assign('user_found', 'category_found', function (users, categories) {
            var foundUsers = {}, foundCategories = {};
            if (users && users.length) {
                users.forEach(function (user) {
                    foundUsers[user.login_name] = user.name;
                });
            }
            if (categories && categories.length) {
                categories.forEach(function (content) {
                    foundCategories[content._id] = content.name;
                });
            }
            articles && articles.forEach(function (article) {
                article.author_id = foundUsers[article.author_id] || '';
                article.name = foundCategories[article.category_id] || '未分类';
            });
            callback(null, articles);
        });
        var ids = [];
        articles.forEach(function (article) {
            ids.push(article.author_id);
        });
        User.getUsersByIds(ids, proxy.done('user_found'));
        Category.findAllCategories(proxy.done('category_found'));
    });
};

exports.getArticleCount = function (callback) {
    Article.count(function (err, count) {
        if (err) {
            callback(err, null);
        }
        callback(null, count);
    })
};

exports.pagination = function (currentPage, pageSize, callback) {
    Article.find().sort({'create_at': -1}).skip((currentPage - 1) * pageSize).limit(pageSize).exec(function (err, articles) {
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
}

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
        instance = new Article();
        instance.title = article.title;
        instance.content = article.content;
        instance.author_id = article.author_id;
        instance.tag = article.tag;
        instance.category_id = article.category_id;
        instance.brief = article.brief;
        instance.classification = article.classification;
        instance.save(function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null, instance);
        });
    }
}

exports.getAdjacentArticles = function (date, callback) {
    if (!date) {
        return callback(null, null, null);
    }
    var proxy = new EventProxy();
    proxy.assign('pre_found', 'after_found', function (pre, after) {
        callback(null, pre, after);
    });

    Article.find({'create_at': {'$lt': date}}).sort({'create_at': -1}).exec(function (err, articles) {
        var data = null, article = null;
        if (articles && (article = articles[0])) {
            data = {'link': '/articles/' + article._id, 'title': article.title};
        }
        proxy.done('pre_found')(null, data);
    });
    Article.find({'create_at': {'$gt': date}}).sort({'create_at': 1}).exec(function (err, articles) {
        var data = null, article = null;
        if (articles && (article = articles[0])) {
            data = {'link': '/articles/' + article._id, 'title': article.title};
        }
        proxy.done('after_found')(null, data);
    });
};

exports.updateReviewTimes = function (article, callback) {
    if (!article) {
        return  callback(null, article);
    }
    article.review_times = (article.review_times || 0) + 1;
    article.update_at = new Date();
    var updateProperty = {
        review_times: article.review_times,
        update_at: article.update_at
    }
    Article.update({_id: article._id}, {$set: updateProperty}, function (err) {
        if (err) {
            return callback(err, null);
        }
        callback(null, article);
    });
};

exports.findLatestArticles = function (callback) {
    // Latest article list at home page limits its size to 8.
    Article.find({classification: '1'}).sort({'create_at': -1}).limit(8).exec(callback);
}

exports.findRecommendArticles = function (callback) {
    // Same as latest articles.
    Article.find({classification: '0'}).sort({'create_at': -1}).limit(8).exec(callback);
}
