/**
 * Created by Carlis on 3/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    login_name: {type: String, unique: true},
    name: {type: String, index: true},
    password: {type: String},
    e_mail: {type: String, unique: true},
    memo: { type: String},
    create_at: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);

