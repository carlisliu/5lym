/**
 * Created by Carlis on 5/27/15.
 */
var express = require('express');
var router = express.Router();
var Article = require('../../proxy').Article;
var Category = require('../../proxy').Category;

router.get('/create.html', function (req, res) {
    Category.findAllCategories(function (error, category) {
        res.render('admin/article', {title: 'Add Article', category: category || []});
    });
});

router.post('/add.html', function (req, res) {
    var article = req.body['article'];
    if (article) {
        Article.saveArticle({
            title: article.title,
            content: article.content,
            author_id: 'carlisliu',
            tag: article.tag,
            category_id: article.category,
            brief: article.brief,
            classification: article.classification
        }, function (e) {
            if (e) {
                return res.json({status: 'error', msg: "Save failed.", error: e});
            }
            res.json({status: 'success', msg: "Article saved.", article: {title: article.title}});
        })
    } else {
        res.json({status: 'error', msg: "Article's content is empty."});
    }
});

module.exports = router;