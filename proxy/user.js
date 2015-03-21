/**
 * Created by Carlis on 3/14/15.
 */
var User = require('../models').User;

exports.getUserById = function (loginName, callback) {
    User.find({login_name: loginName}, function (err, user) {
        if (err) {
            return callback(err);
        }
        return callback(user);
    });
};