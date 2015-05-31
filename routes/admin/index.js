/**
 * Created by Carlis on 5/26/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/index', { title: '后台管理-Carlis个人博客'});
});

module.exports = router;
