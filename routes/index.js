var express = require('express');
var router = express.Router();
var Article = require('../proxy').Article;

/* GET home page. */
router.get('/', function (req, res, next) {
    Article.getAllArticles(function (err, articles) {
        var data = { title: 'Carlis个人博客' };
        if (err) {
            data.error = '查找文章失败';
        }
        data.articles = articles;
        console.log(data);
        res.render('index', data);
    });
});

module.exports = router;
