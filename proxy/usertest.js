/**
 * Created by Carlis on 3/21/15.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    db: { native_parser: true },
    user: config.username,
    pass: config.password
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login_name: {type: String, unique: true},
    name: {type: String, index: true},
    password: {type: String},
    e_mail: {type: String, unique: true},
    memo: { type: String},
    create_at: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);

var User = mongoose.model('User');
User.findOne({login_name : 'carlisliu'}, function(err, user){
    console
        .log(arguments);
});
