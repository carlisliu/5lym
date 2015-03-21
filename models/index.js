var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    db: { native_parser: true },
    user: config.username,
    pass: config.password
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./article');
require('./user');
require('./comments');
require('./share');
require('./category');

exports.Article = mongoose.model('Article');
exports.User = mongoose.model('User');
exports.User = mongoose.model('Comments');
exports.Share = mongoose.model('Share');
exports.Category = mongoose.model('Category');
