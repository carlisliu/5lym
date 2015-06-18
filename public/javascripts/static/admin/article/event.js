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
            var $this = $(this), published;
            if ($this.hasClass('btn-primary')) {
                published = $this.attr('data-publish');
                if (published == 'true') {
                    published = false;
                } else {
                    published = true;
                }
                article.publish($.trim($this.parents('tr').attr('id')), published);
            } else if ($this.hasClass('btn-danger')) {
                article.remove($.trim($this.parents('tr').attr('id')));
            } else {
                //edit
            }
        });

        article.find(1);
    });

});