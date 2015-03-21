/**
 * Created by Carlis on 3/21/15.
 */
var express = require('express'),
    router = express.Router(),
    Article = require('../proxy').Article,
    User = require('../proxy').User;

/*Articles Home Page*/
router.get('/', function (req, res, next) {
    res.end("Please request with an id.");
});

/* GET article by articleId */
router.get('/:id([^add])', function (req, res, next) {
    res.end("Received article's id, but no content yet." + req.params.id);
});

router.get('/add', function (req, res, next) {
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
                author_id : user._id
            }, function (err, article) {
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
