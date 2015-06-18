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

router.get('/find.html', function (req, res) {
    var currentPage = req.query.current || 1,
        pageSize = req.query.size || 10;
    Article.findByPagination(currentPage, pageSize, function (error, article) {
        article = article || [];
        res.json({status: (error ? 'error' : 'success'), article: article})
    });
});

router.get('/remove.html', function (req, res) {
    var id = req.query._id;
    if (id) {
        Article.remove({_id: id}, function (error) {
            if (error) {
                return res.json({status: 'error', msg: 'Remove failed', error: error});
            }
            res.json({status: 'success', msg: 'Removed.'});
        });
    } else {
        res.json({status: 'error', msg: "Article's id is empty."});
    }
});

router.get('/publish.html', function (req, res) {
    var id = req.query._id, published = req.query.published == 'false' ? false : true;
    if (id) {
        Article.publish({_id: id}, published, function (error) {
            if (error) {
                return res.json({status: 'error', msg: published ? 'Publish failed' : 'UnPublish failed', error: error});
            }
            res.json({status: 'success', msg: published ? 'Published.' : 'UnPublished.'});
        });
    } else {
        res.json({status: 'error', msg: "Article's id is empty."});
    }
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
            classification: article.classification,
            published: article.published
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