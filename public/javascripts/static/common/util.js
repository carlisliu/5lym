/**
 * Created by Carlis on 5/25/15.
 */
define(function (require, exports, module) {

    function format(template, data) {
        return !template ? '' : (!data ? template : template.replace(/\{(\w+.?\w+)\}/g,function (m, i) {
            return  data[i] || '';
        }).replace(/\{(\d+)\}/g, function (m, i) {
                return  data[i] || '';
            }));
    }

    module.exports = {
        format: format
    }
});