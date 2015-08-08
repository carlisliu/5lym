/**
 * Created by Carlis on 5/26/15.
 */
var routes = require('./routes/index.js'),
    users = require('./routes/users.js'),
    about = require('./routes/about.js'),
    code = require('./routes/code.js'),
    share = require('./routes/share.js'),
    updateBrowser = require('./routes/upgrade.js'),
    articles = require('./routes/articles.js'),
    download = require('./routes/download.js'),
    birthday = require('./routes/birthday.js'),
    tag = require('./routes/tag.js'),
    love = require('./routes/love.js'),
    dtd = require('./routes/dtd/index.js');

module.exports = function (app) {
    app.use('/', routes);
    app.use('/users', users);
    app.use('/about.html', about);
    app.use('/articles.html', articles);
    app.use('/share.html', share);
    app.use('/code.html', code);
    app.use('/upgrade-browser', updateBrowser);
    app.use('/articles', articles);
    app.use('/download/resume', download);
    app.use('/happy-birthday-to-:format?', birthday);
    app.use('/tag', tag);
    app.use('/love.html', love);
    app.use('/dtd', dtd);
};