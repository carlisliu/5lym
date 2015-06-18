/**
 * Created by Carlis on 6/15/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        Article = require('./article');

    $(function () {
        var article = new Article('#article');
        $('#create-article').click(function (e) {
            window.open('/admin/article/create.html');
            e.preventDefault();
        });

        article.container.delegate('table button', 'click', function (e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.hasClass('btn-info')) {

            } else if ($this.hasClass('btn-danger')) {
                article.remove($.trim($this.attr('id')));
            } else {

            }
        });

        article.find(1);
    });

});