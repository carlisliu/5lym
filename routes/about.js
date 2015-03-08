/**
 * Created by Carlis on 3/7/15.
 */
var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about', { title: 'Carlis个人博客' });
});

module.exports = router;

