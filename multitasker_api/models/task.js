var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  task: String,
  body: String,
  completed: Boolean
});

var Todo = mongoose.model('Task', taskSchema);

module.exports = Task;