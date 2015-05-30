/**
 * Created by Carlis on 5/27/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('about', { title: 'Carlis个人博客', 'contactInfo': '/images/contact-info.png'});
});

module.exports = router;