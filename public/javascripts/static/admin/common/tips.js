/**
 * Created by Carlis on 6/2/15.
 */
define(function (require, exports, module) {

    var $ = require('jquery');

    function Tip(container) {
        this.container = $(container);
    }

    Tip.LEVEL = {
        info: 'info',
        error: 'danger',
        success: 'success'
    };
    //show(level, msg)
    //show(level, msg, callback)
    //show(level, msg, autoHide)
    //show(level, msg, callback, autoHide)
    Tip.prototype = {
        constructor: Tip,
        show: function (level, msg, callback, autoHide) {
            var target;
            autoHide = autoHide || 500;
            if (typeof  callback !== 'function') {
                autoHide = callback || 500;
                callback = null;
            }
            target = $('<div>').addClass('alert alert-' + level).html(msg);
            this.container.append(target);
            if (autoHide) {
                setTimeout(function () {
                    target.hide(function () {
                        target.remove();
                    })
                }, 3000);
            }
            return this;
        }
    };

    $.each(Tip.LEVEL, function (key, value) {
        var level = key.charAt(0).toUpperCase() + key.substring(1);
        Tip.prototype['show' + level] = function (msg, callback, autoHide) {
            this.show(value, msg, callback, autoHide);
            return this;
        };
    });

    module.exports = Tip;
});