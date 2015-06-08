/**
 * Created by Carlis on 6/3/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Category = require('./category');

    $(function () {
        var category = new Category('#category');
        category.find();
        $('#category-save').click(function (e) {
            e.preventDefault();
            var categoryContent = {};
            category.container.find('input[type="text"]').each(function(index, content){
                var $this = $(this);
                categoryContent[$this.attr('data-key')] = $.trim($this.val());
            });
            category.saveOrUpdate(categoryContent);
        });
    });
});