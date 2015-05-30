/**
 * Created by Carlis on 3/22/15.
 */
var express = require('express'),
    router = express.Router(),
    fs = require('fs');

router.get('/', function (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'resume.pdf');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.createReadStream('./resume/resume.pdf').on('error',function (err) {
        console.log('error', err);
        res.end('no file available');
    }).pipe(res);
});
module.exports = router;