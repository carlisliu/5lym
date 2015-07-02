/**
 * Created by Carlis on 6/8/15.
 */
var express = require('express');
var router = express.Router();
var Tag = require('../proxy').Tag;

router.get('/get.html', function (req, res) {
    var topic = ['Java', 'MySql', 'Node.js', 'npm', 'web', 'mongoDb', 'javascript', 'jade', 'css', 'sql', 'noSql', 'jQuery', 'dojo', 'seajs', 'requirejs'];
    var result = [];
    topic.forEach(function (item, index) {
        var content = {};
        content.hit = Math.random() * index;
        content.title = item;
        content.tagName = item;
        result.push(content);
    });
    res.json({tags: result});
});

router.get('/:tag', function (req, res, next) {
    var tag = req.params['tag'];
    if (!tag) {
        return next();
    }
    Tag.findArticlesByTagName(tag.toLowerCase(), function (error, articles) {
        if (error || !articles || !articles.length) {
            next();
        } else {
            res.render('article_index', {articles: articles});
        }
    });
});

module.exports = router;