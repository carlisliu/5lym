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
    console.log(article);
    if (article) {
        res.json({status: 'success', msg: "Article saved.", article: article});
    } else {
        res.json({status: 'error', msg: "Article's content is empty."});
    }
});

module.exports = router;