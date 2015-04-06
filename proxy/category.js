/**
 * Created by Carlis on 4/6/15.
 */
var Category = require('../models').Category;

exports.getCategoryById = function (id, callback) {
    if (!id) {
        return callback(null, null);
    }
    Category.findOne({category_id: id}, function (err, category) {
        if (err) {
            return callback(err, null);
        }
        callback(null, category);
    });
};

exports.findAllCategories = function (callback) {
    Category.find(function (err, categories) {
        if (err) {
            return callback(err, null);
        }
        callback(null, categories);
    });
};