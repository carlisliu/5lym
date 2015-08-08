/**
 * Created by Carlis on 7/14/15.
 */

var schedule = require('node-schedule');
var mail = require('../mail/mail');
var rule = new schedule.RecurrenceRule();
rule.hour = 7;
rule.minute = 30;
module.exports = function(){
    console.log('Sending mail schedule started.');
    schedule.scheduleJob(rule, mail);
    console.log('Sending mail schedule finished.');
};