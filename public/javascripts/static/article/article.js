/**
 * Created by Carlis on 5/18/15.
 */
define(function (require, exports, module) {

    var $ = require('jquery');

    function Article() {
    }

    Article.prototype = {
        constructor: Article,
        getLatestArticles: function () {
            return this;
        }
    };

    $(function(){

    });

    module.exports = Article;
});