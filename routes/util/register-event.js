/**
 * Created by Carlis on 6/6/15.
 */
var EventProxy = require('eventproxy'),
    status = require('./status');

module.exports = function (req, res, next) {
    var ep = new EventProxy();
    ep.fail(function(error){
        if (req.xhr) {
            res.json(status.defaultErrorStatus(error));
        }
        next && next(error);
    });
    res.done = ep.done.bind(ep);
    res.ep = ep;

    var json = res.json;
    res.json = function(){
        var obj = arguments[0];
        if (typeof  obj === 'object' && obj.status !== 'error') {
            arguments[0] = status.status(obj);
        }
        json.apply(res, arguments);
    };

    res.jsonStatus = function(){
        var _status = status.status.apply(status, arguments);
        json.call(res, _status);
    };

    next();
};