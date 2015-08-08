/**
 * Created by Carlis on 7/14/15.
 */

var schedule = require('node-schedule');
var nodeMailer = require('nodemailer');
var mail = require('../mail/mail');
var rule = new schedule.RecurrenceRule();
rule.hour = 9;
rule.minute = 0;
schedule.scheduleJob(rule, mail);