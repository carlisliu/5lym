/**
 * Created by Carlis on 3/12/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {type: String},
    content: {type: String},
    brief: {type: String},
    classification: {type: String, default: '1'},
    tag: {type: String},
    published: {type: Boolean, default: false},
    review_times: {type: Number, default: 0},
    category_id: {type: String},
    author_id: { type: String},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date},
    update_by: {type: String}
});

mongoose.model('Article', ArticleSchema);