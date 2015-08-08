/**
 * Created by Carlis on 7/31/15.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('redirect', {title : 'My Love'});
});

module.exports = router;