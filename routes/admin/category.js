/**
 * Created by Carlis on 5/27/15.
 */
var express = require('express'),
    router = express.Router(),
    Category = require('../../proxy').Category;

router.post('/addOrUpdate.html', function (req, res) {
    var category = req.body['category'];
    if (category && category.name) {
        Category.getCategoryByName(category.name, function (err, content) {
            res.encased(err, res, function (data) {
                if (content) {
                    content.name = category.name;
                    content.memo = category.memo;
                } else {
                    content = category;
                }
                data.category = content;
                Category.saveOrUpdate(content, function (err) {
                    res.encased(err, res, function (data) {
                        res.json(data);
                    });
                });
            });
        });
    } else {
        res.json({status: 'error', msg: 'Category content is empty'});
    }
});

router.get('/find.html', function (req, res) {
    var currentPage = req.query.current || 1, pageSize = req.query.size || 10;
    Category.findCategoriesByPagination(parseInt(currentPage), parseInt(pageSize), function (err, categories) {
        res.encased(err, res, function (data) {
            data.category = categories;
            res.json(data);
        });
    });
});

router.get('/remove.html', function (req, res) {
    var _id = req.query._id;
    if (_id) {
        Category.remove(_id, function(error) {
            if (error) {
                return res.json({status: 'error', msg: 'Remove failed', error: error});
            }
            res.json({status: 'success'});
        });
    } else {
        res.json({status: 'error', msg: "Category's id is empty"});
    }
});

module.exports = router;