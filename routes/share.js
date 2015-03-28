var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('share', {title : '分享首页--刘雨萌博客'});
});

module.exports = router;