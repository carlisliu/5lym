/**
 * Created by Carlis on 3/22/15.
 */
var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path');

router.get('/', function (req, res, next) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'resume.xls');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.createReadStream('./resume/resume.pdf').on('error', function(err){
        console.log('error', err);
        res.end('no file available');
    }).pipe(res);
});
module.exports = router;