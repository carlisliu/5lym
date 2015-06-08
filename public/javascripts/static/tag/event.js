/**
 * Created by Carlis on 6/8/15.
 */
define(function(require, exports, module){
   var $ = require('jquery'),
       Tag = require('./tag');

    $(function(){
        var tag = new Tag('.topspaceinfo');
        tag.get();
    });
});