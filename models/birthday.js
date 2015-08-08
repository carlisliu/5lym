/**
 * Created by Carlis on 7/21/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BirthdaySchema = new Schema({
    name: {
        first: {type: String},
        middle: {type: String},
        last: {type: String}
    },
    alias: {type: String},
    birthday: {type: Date},
    subject: {type: String},
    text: {type: String},
    html: {type: String},
    e_mail: {type: String}
});

mongoose.model('Birthday', BirthdaySchema);