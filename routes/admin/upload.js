/**
 * Created by Carlis on 7/10/15.
 */

var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

router.get('/', function (req, res, next) {
    res.render('admin/file-upload');
});

router.post('/image', function (req, res, next) {
    var form = new formidable.IncomingForm();
    //change temp directory.
    form.uploadDir = "./public/upload/temp/";
    form.parse(req, function (error, fields, files) {
        for (var key in files) {
            var file = files[key];
            var fName = (new Date()).getTime();
            switch (file.type) {
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
                default :
                    fName = fName + ".png";
                    break;
            }
            var uploadDir = "./public/upload/" + fName;
            fs.rename(file.path, uploadDir, function (err) {
                if (err) {
                    res.write(err + "\n");
                    res.end();
                }
                res.write("upload image:<br/>");
                res.write("<img src='/imgShow?id=" + fName + "' />");
                res.end();
            });
        }
    });
});

module.exports = router;