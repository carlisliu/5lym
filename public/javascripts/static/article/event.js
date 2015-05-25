/**
 * Created by Carlis on 5/25/15.
 */
define(function (require, exports, module) {

    var $ = require('jquery'),
        Article = require('./article'),
        util = require('../common/util');

    $(function () {
        var article = new Article();
        article.getLatestArticles(function (error, data) {
            var articleContent = '';
            if (error) {
                articleContent = util.format(article.template, {href: '#', title: '无'})
            } else {
                $(data.articles).each(function (index, content) {
                    articleContent += util.format(article.template, {title: content.title, href: '/articles/' + content._id});
                });
            }
            if (articleContent) {
                $('#article-latest').html(articleContent);
            }
        }).getRecommendArticles(function (error, data) {
                var articleContent = '';
                if (error) {
                    articleContent = util.format(article.template, {href: '#', title: '无'})
                } else {
                    $(data.articles).each(function (index, content) {
                        articleContent += util.format(article.template, {title: content.title, href: '/articles/' + content._id});
                    });
                }
                if (articleContent) {
                    $('#article-recommend').html(articleContent);
                }
            });
    });
});