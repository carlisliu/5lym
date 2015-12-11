var express = require('express');
var router = express.Router();
var Article = require('../proxy').Article;
var moment = require('moment');
var Common = require('../proxy').Common;

/* GET home page. */
router.get('/', function (req, res, next) {
    Article.getAllArticles(function (err, articles) {
        if (err) {
            articles = [];
        }
        // get the latest five articles
        if (articles && articles.length > 5) {
            articles = articles.slice(0, 5);
        }
        articles && articles.forEach(function (content, index) {
            if (content.content && content.content.length > 400) {
                articles[index].content = content.content.substring(0, 400) + '...';
            }
            articles[index].create_date = moment(content.create_at).format('YYYY-MM-DD');
        });
        res.render('index', {articles: articles});
    });
});

module.exports = router;
