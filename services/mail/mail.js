/**
 * Created by Carlis on 7/14/15.
 */

var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
    //service: 'QQ',
    port: 465,
    host: 'smtp.126.com',
    secure: true,
    auth: {
        user: 'admin@5lym.com',
        pass: 'admin'
    }
});

var mailOptions = {
    from: 'Kris<' + 'admin@5lym.co' + '>', // sender address
    to: 'admin@live.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: ' + info.response);
    }
});