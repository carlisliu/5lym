/**
 * Created by Carlis on 6/3/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Category = require('./category');

    $(function () {
        var category = new Category('#category');
        category.find(1);
        $('#category-save').click(function (e) {
            e.preventDefault();
            var categoryContent = {};
            category.container.find('input[type="text"]').each(function(index, content){
                var $this = $(this);
                categoryContent[$this.attr('data-key')] = $.trim($this.val());
            });
            category.saveOrUpdate(categoryContent);
        });
        category.container.delegate('td div button', 'click', function(e){
            e.preventDefault();
            console.log('click');
            var $this = $(this);
            if ($this.hasClass('btn-default')) {
                //edit
            } else {
                category.remove($.trim($this.parents('tr').attr('id')));
            }
        });
    });
});