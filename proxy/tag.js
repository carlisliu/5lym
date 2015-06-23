/**
 * Created by Carlis on 6/8/15.
 */

var Article = require('../models').Article;

exports.findArticlesByTagName = function (_tag, callback) {
    Article.find().$where(function () {
        console.log(this.tag);
        if (this.tag) {
            return true;
        }
        return false;
    }).exec(callback);
};