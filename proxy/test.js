/**
 * Created by Carlis on 3/16/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://root:root@127.0.0.1/carlis_blog_prod');
var ArticleSchema = Schema({
    title: {type: String},
    content: {type: String},
    author_id: { type: ObjectId},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date},
    update_by: { type: ObjectId}
});

var UserSchema = Schema({
    login_name: {type: String, unique: true},
    name: {type: String, index: true},
    password: {type: String},
    e_mail: {type: String, unique: true},
    memo: { type: String},
    create_at: {type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);
var Article = mongoose.model('Article', ArticleSchema);
User.findOne({_id: '5506c2b65ad2b2443be2c66b'}, function (err, user) {
    if (err) {
        console.log('error ');
        return  null;
    }
    console.log(user);
    var article = new Article();
    article.title = "first";
    article.content = 'content'
    article.author_id = user._id;
    article.save(function (err, article) {
        if (err) {
            console.log('saved error');
            return null;
        }
        console.log('saved :');
        console.log(article);
    });
})
/*
 var userInstance = new User();
 userInstance.login_name = 'carlisliu';
 userInstance.name = 'Carlis Liu';
 userInstance.password= 'root';
 userInstance.e_mail = 'carlisliu@live.com';

 userInstance.save(function(err, users){
 if(err){
 console.log('save error');
 return null;
 }
 User.find(function(err, users){
 if(err){
 console.log('find error');
 return null;
 }
 console.log('find users:');
 console.log(users);
 })
 });
 */


