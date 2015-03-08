/**
 * Created by Carlis on 3/8/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('upgrade');
});

module.exports = router;