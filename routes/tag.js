/**
 * Created by Carlis on 6/8/15.
 */
var express = require('express');
var router = express.Router();

router.get('/get.html', function (req, res, next) {
    var topic = ['Java', 'MySql', 'Node.js', 'npm', 'web', 'mongoDb', 'javascript', 'jade', 'css', 'sql', 'noSql', 'jQuery', 'dojo', 'seajs', 'requirejs'];
    var result = [];
    topic.forEach(function(item, index){
        var content = {};
        content.hit = Math.random() *index  ;
        content.title = item;
        content.tagName = item;
        result.push(content);
    });
    res.json({tags: result});
});

module.exports = router;