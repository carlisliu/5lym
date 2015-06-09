/**
 * Created by Carlis on 6/8/15.
 */

var Article = require('../models').Article;

exports.findArticlesByTagName = function (tag, callback) {
    Article.find({tag: tag}, callback);
};