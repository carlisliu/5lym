/**
 * Created by Carlis on 6/15/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Tip = require('../common/tips'),
        tip = new Tip('#article-tip-container'),
        util = require('util');

    function Article(container, editor) {
        this.container = $(container);
        this.template = $.trim($('#article-template').html());
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
        publish: function (id, published) {
            $.getJSON('/admin/article/publish.html', {_id: id, published: !!published}).done(function (data) {
                if (data.status === 'success') {
                    tip.showSuccess(data.msg);
                }
            }).fail(function (e) {
                    tip.showError(data.msg);
                });
            return this;
        },
        remove: function (id) {
            var that = this;
            $.getJSON('/admin/article/remove.html', {_id: id}).done(function (data) {
                if (data.status === 'success') {
                    that.container.find('tr[id=' + id + ']').remove();
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
            var html = '', template = this.template;
            $(articles).each(function (index, content) {
                if (content.published) {
                    content.status = 'UnPublish';
                } else {
                    content.status = 'Publish';
                }
                html += util.format(template, content);
            });
            if (html) {
                this.container.find('table tbody').append(html);
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