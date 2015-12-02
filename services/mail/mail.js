/**
 * Created by Carlis on 7/14/15.
 */

var nodeMailer = require('nodemailer');
var util = require('../util/util');
var config = require('./config');

var transporter = nodeMailer.createTransport(config);

function sendMail(options, callback) {
    transporter.sendMail(options, callback);
}

module.exports.sendMail = sendMail;

module.exports.sendMailBySystem = function (options, callback) {
    options = util.extend({
        from: '刘雨萌_Carlis Liu<{account}>'.replace(/\{(\w+)\}/, config.auth.user),
        cc: 'admin@qq.com'
    }, options || {});
    sendMail(options, callback);
};