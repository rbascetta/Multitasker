var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    debug = require('debug')('app:models');

var taskSchema = new Schema ({
	title: String,
	body: String,

})

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;


