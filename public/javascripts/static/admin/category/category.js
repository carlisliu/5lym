/**
 * Created by Carlis on 6/2/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Tip = require('../common/tips'),
        tip = new Tip('#tip-container');

    function Category(container) {
        this.container = $(container);
        this.elements = this.container.find('input[type="text"]');
    }

    Category.fn = Category.prototype = {
        constructor: Category,
        saveOrUpdate: function (category) {
            var that;
            if (!category.name) {
                console.log("Category's name is empty.");
            } else {
                that = this;
                $.post('/admin/category/addOrUpdate.html', {category: category}).done(function (data) {
                    if (data.status === 'success') {
                        that.success(data.category);
                    }
                }).fail(function (e) {
                        that.fail('Error occurs');
                    });
            }
            return this;
        },
        success: function (category) {
            tip.showSuccess('Saved.')
            this.elements.val('');
            return this;
        },
        fail: function (msg) {
            tip.showError(msg);
        }
    };

    module.exports = Category;
});