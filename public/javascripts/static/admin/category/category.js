/**
 * Created by Carlis on 6/2/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Tip = require('../common/tips'),
        util = require('util')
        tip = new Tip('#category-tip-container');

    function Category(container) {
        this.container = $(container);
        this.elements = this.container.find('input[type="text"]');
        this.template = $.trim($('#category-template').html());
    }

    Category.PAGE_SIZE = 10;

    Category.prototype = {
        constructor: Category,
        saveOrUpdate: function (category) {
            var that;
            if (!category.name) {
                tip.showError("Category's name is empty.");
            } else {
                that = this;
                $.ajax({
                    type: 'POST',
                    url: '/admin/category/addOrUpdate.html',
                    dataType: 'json',
                    data: {category: category}
                }).done(function (data) {
                        if (data.status === 'success') {
                            console.log('success');
                            that.success(data.category);
                        }
                    }).fail(function (e) {
                        console.error(e);
                        that.fail('Error occurs');
                    });
            }
            return this;
        },
        render: function(categories){
            var html = '', template;
            if (categories) {
                template = this.template;
                $(categories).each(function(index, content){
                    html += util.format(template, content);
                });
                if (html) {
                    this.container.find('table tbody').append(html);
                }
            } else {
                this.container.find('table tbody').append('<tr><td colspan="3">No Category</td></tr>');
            }
            return this;
        },
        find: function (currentPage, pageSize) {
            var that = this;
            currentPage = currentPage || 1;
            pageSize = pageSize || Category.PAGE_SIZE;
            $.getJSON('/admin/category/find.html', {current: currentPage, size: pageSize}).done(function (data) {
                console.log(data);
                that.render(data.category);
            }).fail(function (e) {
                    console.error(e);
                });
            return this;
        },
        remove: function(id){
            var that = this;
            if (id) {
                $.getJSON('/admin/category/remove.html', {_id: id}).done(function(data){
                    if (data.status === 'success') {
                        tip.showSuccess('Removed.');
                        that.container.find('tbody tr[id=' + id + ']').remove();
                    }
                }).fail(function(e){
                    console.error(e);
                    tip.showError('Remove failed.');
                });
            } else {
                tip.showError("Category's id is empty.");
            }
            return this;
        },
        success: function (category) {
            tip.showSuccess('Saved.');
            this.elements.val('');
            return this;
        },
        fail: function (msg) {
            tip.showError(msg);
        }
    };

    module.exports = Category;
});