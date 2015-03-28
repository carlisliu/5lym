/**
 * Created by Carlis on 3/22/15.
 */
var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path');

router.get('/', function(req, res, next){
    res.setHeader('Content-disposition', 'attachment; filename=' + 'resume.xls');
    res.writeHead(200, {'Content-Type': 'text/plai'});
    fs.createReadStream( './resume/resume.xls').pipe(res);
});
module.exports = router;