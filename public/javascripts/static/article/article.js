/**
 * Created by Carlis on 5/18/15.
 */
define(function (require, exports, module) {

    var $ = require('jquery');

    function Article() {
        this.template = '<li><a href="{href}" title="{title}">{title}</a></li>';
    }

    Article.prototype = {
        constructor: Article,
        getLatestArticles: function (callback) {
            $.getJSON('/articles/get/latest.html').done(function (data) {
                if (data && data.status == 'success') {
                    callback(null, data);
                }
            }).fail(function (e) {
                    callback(e);
                });
            return this;
        },
        getRecommendArticles: function (callback) {
            $.getJSON('/articles/get/recommend.html').done(function (data) {
                if (data && data.status == 'success') {
                    callback(null, data);
                }
            }).fail(function (e) {
                    callback(e);
                });
            return this;
        }
    };

    module.exports = Article;
});