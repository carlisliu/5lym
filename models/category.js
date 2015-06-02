/**
 * Created by Carlis on 3/17/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    category_id: {type: String},
    name: {type: String},
    memo: {type: String},
    create_at: {type: Date, default: Date.now}
});

mongoose.model('Category', CategorySchema);
