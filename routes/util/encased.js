/**
 * Created by Carlis on 6/6/15.
 */

var extend = require('../../util/util').extend;

module.exports = function (req, res, next) {
    res.encased = function (error, callback) {
        var data = {};
        if (error) {
            data.status = 'error';
            data.msg = 'Error occurs';
            data.error = error;
            if (req.xhr) {
                return res.json(data);
            } else {
                return res.render('error', data);
            }
        } else {
            data.status = 'success';
        }
        if (typeof  callback === 'object') {
            extend(data, callback);
        }
        if (typeof callback === 'function') {
            var result = callback(data);
            if (typeof result === 'object' && data !== result) {
                extend(data, result);
            }
        }
    };
    next();
};