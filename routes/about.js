/**
 * Created by Carlis on 3/7/15.
 */
var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about', { title: '关于我-Carlis个人博客' ,'contactInfo' : '/images/contact-info.png'});
});

module.exports = router;

