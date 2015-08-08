/**
 * Created by Carlis on 7/21/15.
 */
var Birthday = require('../models').Birthday;

exports.find = function(callback){
    Birthday.find(callback);
};