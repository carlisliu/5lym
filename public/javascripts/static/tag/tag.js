/**
 * Created by Carlis on 6/8/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        util = require('../common/util');

    function Tag(container) {
        this.container = $(container);
        this.template = '<a href="/tag/{tagName}" data-hit="{hit}" title="{tagName}" style="font-size: {zoom}pt;">{tagName}</a>';
    }

    function shuffle(args) {
        args.sort(function () {
            return 0.5 - Math.random();
        });
        return args;
    }

    Tag.prototype = {
        constructor: Tag,
        get: function () {
            var that = this;
            $.getJSON('/tag/get.html').done(function (data) {
                var template = that.template, html = [];
                $(data.tags).each(function (index, content) {
                    content.zoom = that.zoom(content.hit);
                    html.push(util.format(template, content));
                });
                if (html.length) {
                    that.render(shuffle(html).join(''));
                }
            }).fail(function (e) {
                    console.error(e);
                });
            return this;
        },
        render: function (tags) {
            this.container.html(tags);
            return this;
        },
        zoom: function (hit) {
            hit = hit || 0;
            return 8 + hit * Math.random();
        }
    };

    module.exports = Tag;
})