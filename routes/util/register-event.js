/**
 * Created by Carlis on 6/6/15.
 */
var EventProxy = require('eventproxy'),
    status = require('./status');

module.exports = function (req, res, next) {
    var ep = new EventProxy();
    ep.on('error', function(error, next){
        if (req.xhr) {
            res.json(status.defaultErrorStatus(error));
        }
        next && next();
    });
    res.ep = ep;
    next();
};