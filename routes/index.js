var express = require('express');
var router = express.Router();
var Article = require('../proxy').Article;
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
    Article.getAllArticles(function (err, articles) {
        var data = { title: 'Carlis个人博客' };
        if (err) {
            data.error = '查找文章失败';
        }
        // get the latest five articles
        if (articles && articles.length > 5) {
            articles = articles.slice(0, 5);
        }
        articles && articles.forEach(function (content, index) {
            if (!index) {
                articles[index].figure = '/figures/007.jpg';
            }
            if (content.content && content.content.length > 400) {
                articles[index].content = content.content.substring(0, 400) + '...';
            }
            articles[index].create_date = moment(content.create_at).format('YYYY-MM-DD');
        });
        data.articles = articles;
        res.render('index', data);
    });
});

module.exports = router;
