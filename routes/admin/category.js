/**
 * Created by Carlis on 5/27/15.
 */
var express = require('express'),
    router = express.Router(),
    Category = require('../../proxy').Category;

router.get('/', function (req, res) {
    res.render('about', { title: 'Carlis个人博客', 'contactInfo': '/images/contact-info.png'});
});

router.post('/addOrUpdate.html', function (req, res) {
    var category = req.body['category'];
    if (category && category.name) {
        Category.getCategoryByName(category.name, function (err, content) {
            var data = {};
            if (err) {
                data.status = 'error';
                data.msg = err.toString();
            } else {
                if (content) {
                    content.name = category.name;
                    content.memo = category.memo;
                } else {
                    content = category;
                }
                data.status = 'success';
                data.category = content;
                Category.saveOrUpdate(content, function (err) {
                    res.json(data);
                });
            }
        });
    } else {
        res.json({status: 'error', msg: 'Category content is empty'});
    }
});

module.exports = router;