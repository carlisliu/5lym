/**
 * Created by Carlis on 4/6/15.
 */
var Category = require('../models').Category;

exports.getCategoryById = function (id, callback) {
    if (!id) {
        return callback(new Error("Category's id is empty."), null);
    }
    Category.findOne({_id: id}, callback);
};

exports.getCategoryByName = function (name, callback) {
    if (!name) {
        return callback(new Error("Category's name is empty."));
    }
    Category.findOne({name: name}, callback);
};

exports.saveOrUpdate = function (content, callback) {
    if (content._id) {
        Category.update({_id: content._id}, {$set: {name: content.name, memo: content.memo}}, callback);
    } else {
        var category = new Category();
        category.name = content.name;
        category.memo = content.memo;
        category.save(callback);
    }
};

exports.findAllCategories = function (callback) {
    Category.find(callback);
};

exports.findCategoriesByPagination = function (currentPage, pageSize, callback) {
    Category.find().limit(pageSize).skip(currentPage - 1).exec(callback);
};

exports.remove = function(_id, callback){
    Category.remove({_id: _id}, callback);
};