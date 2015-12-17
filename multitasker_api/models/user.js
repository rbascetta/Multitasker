var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    debug = require('debug')('app:models');

    mongoose.Promise = Promise;

var taskSchema = mongoose.Schema({
  task:      String,
  body:      String,
  completed: Boolean
});

var userSchema = mongoose.Schema ({
	email:    String,
	name:     String,
	password: String,
	// tasks: [taskSchema]
	// [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;


