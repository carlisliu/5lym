/**
 * Created by Carlis on 3/14/15.
 */
var User = require('../models').User;

exports.getUserById = function (loginName, callback) {
    User.findOne({login_name: loginName}, function (err, user) {
        if (err) {
            return callback(err);
        }
        return callback(null, user);
    });
};
