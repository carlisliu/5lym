/**
 * Created by Carlis on 2015/12/1.
 */
var debug = require('debug')('5lym:job/birthday');
var Birthday = require('../../models').Birthday;
var mailProxy = require('../../services').mail;
var EventProxy = require('eventproxy');

function build(birthday) {
    return {
        to: birthday['e_mail'], // list of receivers
        subject: birthday['subject'], // Subject line Hello ✔
        text: birthday['text'], // plaintext body
        html: birthday['html'] // html body
    };
}

module.exports = function () {
    debug('Birthday job started.');
    Birthday.find(function (error, birthdays) {
        if (error) {
            debug('Birthday job corrupted.');
            return console.error(error);
        }
        if (!birthdays.length) {
            return debug('Nothing to send.');
        }
        var ep = new EventProxy();
        ep.on('read', function (msg) {
            debug(msg);
        });
        ep.after('read', birthdays.length, function (list) {
            debug('Birthday job ended.');
        });
        birthdays.forEach(function (birthday) {
            mailProxy.sendMailBySystem(build(birthday), function (error, msg) {
                ep.emit('read', birthday.alias + ': ' + msg);
            });
        });
    });
};