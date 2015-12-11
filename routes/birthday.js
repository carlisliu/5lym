/**
 * Created by Carlis on 4/6/15.
 */
var express = require('express');
var router = express.Router();

/* GET birthday page. */
router.get('/', function (req, res, next) {
    var path = req.baseUrl, index = path.lastIndexOf('-'), name = path.substring((index || 0) + 1) || 'you',data = {};
    data.name = name;
    data.title = 'Happy Birthday to ' + data.name;
    res.render('birthday', data);
});

module.exports = router;