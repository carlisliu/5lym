/**
 * Created by Carlis on 5/27/15.
 */
var express = require('express'),
    router = express.Router(),
    Category = require('../../proxy').Category,
    util = require('../../util/util');

router.post('/addOrUpdate.html', function (req, res) {
    var category = req.body['category'];
    if (category && category.name) {
        res.ep.once('find',function (content) {
            content = util.extend(content || {}, category);
            Category.saveOrUpdate(content, res.ep.done('save', function () {
                return content;
            }));
        }).once('save', function (_category) {
                res.jsonStatus({category: _category});
            });
        Category.getCategoryByName(category.name, res.done('find'));
    } else {
        res.json({status: 'error', msg: 'Category content is empty'});
    }
});

router.get('/find.html', function (req, res) {
    var currentPage = req.query.current || 1, pageSize = req.query.size || 10;
    res.ep.once('find', function (categories) {
        res.jsonStatus({category: categories.map(function (category) {
            return {
                _id: category.id,
                memo: category.memo,
                name: category.name
            };
        })});
    });
    Category.findCategoriesByPagination(parseInt(currentPage), parseInt(pageSize), res.done('find'));
});

router.get('/remove.html', function (req, res) {
    var _id = req.query._id;
    if (_id) {
        res.ep.once('remove', function () {
            res.json({msg: 'removed'});
        });
        Category.remove(_id, res.done('remove'));
    } else {
        res.json({status: 'error', msg: "Category's id is empty"});
    }
});

module.exports = router;