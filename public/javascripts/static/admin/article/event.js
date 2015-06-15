/**
 * Created by Carlis on 6/15/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery');

    $('#create-article').click(function (e) {
        window.open('/admin/article/create.html');
        e.preventDefault();
    });
});