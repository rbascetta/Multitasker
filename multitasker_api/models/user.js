var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    debug = require('debug')('app:models');

    mongoose.Promise = Promise;

var taskSchema = mongoose.Schema({
  title:     String,
  body:      String,
  completed: { type: Boolean, default: false }
});

var userSchema = mongoose.Schema ({
	email:    String,
	name:     String,
	password: String,
	tasks:    [taskSchema]
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;


