/**
 * Created by Carlis on 8/8/15.
 */
var mailSchedule = require('./schedule/mail');
var config = require('../config');

module.exports = function(){
    config.schedule === 'active' && mailSchedule();
};