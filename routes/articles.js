/**
 * Created by Carlis on 3/21/15.
 */
var express = require('express'),
    router = express.Router(),
    Article = require('../proxy').Article,
    User = require('../proxy').User,
    moment = require('moment');

/*Articles Home Page*/
router.get('/', function (req, res, next) {
    res.render('article_index', {title : '文章首页--刘雨萌博客'});
});

/* GET article by articleId */
router.get('/:id', function (req, res, next) {
    var articleId = req.params['id'];
    Article.getArticleById(articleId, function(err, article){
        article.create_date = moment(article.create_at).format('YYYY-MM-DD');
        res.render('article_detail', {article :article, title : (article.title || '') + '-刘雨萌博客'});
    });
});

router.get('/admin/create', function (req, res, next) {
    res.render('create_article');
});

router.post('/add', function (req, res, next) {
    var title, content;
    title = req.body['title'];
    content = req.body['content'];
    if (title && content) {
        User.getUserById('carlisliu', function (err, user) {
            user = user || {};
            Article.saveArticle({
                title : title,
                content : content,
                category_id : '1',
                author_id : user.login_name
            }, function (err, article) {
                console.log(article);
                if (err) {
                    res.end('Saved Error: ' + title);
                }
                res.send('保存成功 ' + article.title);
            });
        });
    }else {
        res.redirect('/articles/add?err=no%20data');
    }
});

module.exports = router;
