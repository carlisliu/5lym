/**
 * Created by Carlis on 8/8/15.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET about page. */
router.get('/:id', function (req, res, next) {
    var id = req.params['id'];
    if (id === 'dynamic-statement-1.0.dtd') {
        res.writeHead(200, {'Content-Type': 'text/xml'});
        fs.createReadStream('./resources/dynamic-statement.dtd').on('error',function (err) {
            console.log('error', err);
            next();
        }).pipe(res);
    } else {
        next();
    }
});

module.exports = router;