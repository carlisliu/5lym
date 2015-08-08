/**
 * Created by Carlis on 7/14/15.
 */

var schedule = require('node-schedule');
var nodeMailer = require('nodemailer');
var rule = new schedule.RecurrenceRule();
rule.hour = 9;
rule.minute = 0;
schedule.scheduleJob(rule, function () {
    var transporter = nodeMailer.createTransport({
        //service: 'QQ',
        port: 465,
        host: 'smtp.126.com',
        secure: true,
        auth: {
            user: 'light8220@126.com',
            pass: 'woai056166'
        }
    });

    var mailOptions = {
        from: '刘雨萌(Carlis Liu)<' + 'light8220@126.com' + '>', // sender address
        to: 'admin@sohu.com', // list of receivers
        subject: 'Hello there✔', // Subject line
        text: 'Hello world there✔', // plaintext body
        html: '<b>Hello world there✔</b>' // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
});