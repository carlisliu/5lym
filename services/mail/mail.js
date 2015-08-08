/**
 * Created by Carlis on 7/14/15.
 */

var nodeMailer = require('nodemailer');
var config = require('../../config');
var sender = config.sender;
var Birthday = require('../../proxy').Birthday;

var transporter = nodeMailer.createTransport({
    //service: 'QQ',
    port: 465,
    host: 'smtp.126.com',
    secure: true,
    auth: {
        user: sender.account,
        pass: sender.pass
    }
});

module.exports = function () {
    Birthday.find(function (err, birthdays) {
        if (err) {
            return console.log(err);
        }
        for (var i = 0, length = birthdays.length; i < length; i++) {
            (function (i) {
                var bDay = birthdays[i];
                var mailOptions = {
                    from: 'Kris<' + sender.account + '>', // sender address
                    to: bDay['e_mail'], // list of receivers
                    cc: sender.cc,
                    subject: bDay['subject'], // Subject line Hello ✔
                    text: bDay['text'], // plaintext body
                    html: bDay['html'] // html body
                };
                console.log('got ' + bDay.name.first + "'s mail, sending now...");
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message for ' + bDay.name.first + ' sent: ' + info.response);
                    }
                });
            })(i);
        }
    });
};

