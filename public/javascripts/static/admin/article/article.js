/**
 * Created by Carlis on 6/15/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Tip = require('../common/tips'),
        tip = new Tip(''),
        util = require('util');

    function Article(container, editor) {
        this.container = $(container);
        this.template = $.trim($().html());
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
        publish: function (id) {
            $.getJSON('/admin/article/publish.html', {_id: id}).done(function (data) {
                if (data.status === 'success') {
                    tip.showSuccess('Published.');
                }
            }).fail(function (e) {
                    tip.showError('Publish failed.');
                });
            return this;
        },
        remove: function (id) {
            $.getJSON('/admin/article/remove.html', {_id: id}).done(function (data) {
                if (data.status === 'success') {
                    tip.showSuccess('Removed.');
                }
            }).fail(function (e) {
                    tip.showError('Remove failed.');
                });
            return this;
        },
        find: function (currentPage, pageSize) {
            var that = this;
            $.getJSON('/admin/article/find.html', {current: currentPage, size: pageSize}).done(function (data) {
                that.render(data.article);
            }).fail(function (e) {
                    console.error(e);
                });
            return this;
        },
        render: function (articles) {
            var html = '', template, that = this;
            if (articles) {
                template = this.template;
                $(articles).each(function (index, content) {
                    html += util.format(template, content);
                });
                if (html) {
                    that.container.find('table tbody').append(html);
                }
            }
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