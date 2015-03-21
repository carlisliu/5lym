/**
 * Created by Carlis on 3/16/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentsSchema = new Schema({
    article_id: {type: ObjectId},
    comment_content: {type: String},
    comment_user_id: {type: ObjectId},
    reply_to: {type: ObjectId},
    create_at: {type: Date, default: Date.now}
});

mongoose.model('Comments', CommentsSchema);
