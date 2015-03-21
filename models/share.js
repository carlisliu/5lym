/**
 * Created by Carlis on 3/16/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ShareSchema = new Schema({
    title: {type: String},
    hyperlink: {type: String},
    comment: { type: String},
    share_at: {type: Date, default: Date.now},
    share_by: {type: ObjectId}
});

mongoose.model('Share', ShareSchema);
