/**
 * Created by Carlis on 5/26/15.
 */
var index = require('./routes/admin/index.js'),
    category = require('./routes/admin/category.js'),
    article = require('./routes/admin/article.js');

module.exports = function (app) {
    app.use('/admin', index);
    app.use('/admin/category', category);
    app.use('/admin/article', article);
};