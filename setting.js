/**
 * Created by Carlis on 2015/12/3.
 */
var config = require('./config');
var me = require('./me.js');

module.exports = function(req, res, next){
    res.locals.title = config.title;
    res.locals.me = me;
    next();
};