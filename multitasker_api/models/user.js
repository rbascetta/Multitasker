var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    debug = require('debug')('app:models');

    mongoose.Promise = Promise;

var taskSchema = mongoose.Schema({
  body:      String,
  completed: { type: Boolean, default: false }
});

var listSchema = mongoose.Schema({
  title:     String,
  tasks:     [taskSchema]
});

var userSchema = mongoose.Schema ({
	email:    String,
	name:     String,
	password: String,
	lists:    [listSchema]
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;


