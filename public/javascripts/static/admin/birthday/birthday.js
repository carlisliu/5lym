/**
 * Created by Carlis on 8/13/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    function Birthday(container) {
        this.container = $(container);
    }
    Birthday.prototype = {
        constructor: Birthday,
        find: function () {
            return this;
        },
        update: function (item) {
            return this;
        },
        remove: function (id) {
            return this;
        },
        insert: function (item) {
            return this;
        },
        upsert: function (item) {
            return this;
        }
    }
    module.exports = Birthday;
});