/**
 * Created by Carlis on 5/26/15.
 */
var express = require('express');
var router = express.Router();
var config = require('../../config');

router.get('/', function (req, res) {
    res.render('admin/auth', { title: '后台管理验证-Carlis个人博客'});
});

router.post('/verification.html', function (req, res, next) {
    var identification = req.body.identification;
    if (identification !== config.verification) {
        next();
    } else {
        res.render('admin/index', { title: '后台管理-Carlis个人博客'});
    }
});

module.exports = router;