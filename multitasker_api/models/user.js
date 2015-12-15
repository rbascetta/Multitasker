var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    debug = require('debug')('app:models');

var userSchema = mongoose.Schema ({
	email: String,
	name: String,
	password: String,
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]

});

var User = mongoose.model('User', userSchema);

module.exports = User;


