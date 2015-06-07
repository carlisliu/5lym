/**
 * Created by Carlis on 6/2/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Tip = require('../common/tips'),
        tip = new Tip('#category-tip-container');

    function Category(container) {
        this.container = $(container);
        this.elements = this.container.find('input[type="text"]');
    }

    Category.prototype = {
        constructor: Category,
        saveOrUpdate: function (category) {
            var that;
            if (!category.name) {
                tip.showError("Category's name is empty.");
            } else {
                that = this;
                $.ajax({
                    type: "POST",
                    url: "/admin/category/addOrUpdate.html",
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