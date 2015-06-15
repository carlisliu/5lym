/**
 * Created by Carlis on 6/15/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery');

    function Article(container, editor) {
        this.container = $(container);
        this.editor = $(editor);
    }

    Article.prototype = {
        constructor: Article,
        data: function () {
            return {};
        },
        save: function (data, callback) {
            var that = this;
            $.post('/admin/article/add.html', {article: data || this.data()}).done(function (data) {
                if (data.status === 'success') {
                    that.clear();
                    that.notify(null, data.article);
                } else {
                    that.notify(data.error, null);
                }
            }).fail(function (e) {
                    that.notify(e, null);
                });
            return this;
        },
        clear: function () {
            this.container.find('textarea, input[type="text"], select').val('');
            return this;
        },
        notify: function (error, data) {
            if (error) {
                console.error(error);
            } else {
                console.log(data);
            }
            return this;
        }
    };

    module.exports = Article;
});