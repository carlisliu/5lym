var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var errorHandler = require('errorhandler');
var fs = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
var errorLogStream = fs.createWriteStream(__dirname + '/logs/error.log', {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./setting'));
app.use(require('./routes/util/register-event'));

//routes
require('./routes')(app);
require('./admin-routes')(app);

app.use(errorHandler({log: function (err, str, req) {
    console.error('error captured.');
    var meta = '[' + new Date() + '] ' + 'Error in ' + req.method + req.url + '\n';
    errorLogStream.write(meta + err.stack + '\n');
}}));

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

process.on('uncaughtException', function (err) {
    errorLogStream.write(err.stack + '\n');
    process.exit(1);
});

module.exports = app;