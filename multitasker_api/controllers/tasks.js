var User = require('../models/user');
// Require resource's model(s).
// var Task = require('../models/task');

// var index = function(req, res) {
//   Task.find({}, function(err, records){
//       res.send(records);
//   });
// };

var create = function(req, res) {
  req.user.tasks.push(req.body);
  req.user.save(function(err, user) {
    res.json({message: "Added new task.", user: user});
  });
};

var createList = function(req, res) {
	User.findById(req.body.userId, function(err, user) {
	  if (!user.lists) user.lists = [];
	  user.lists.push(req.body);
	  user.save(function(err, user) {
	    res.json(user.lists.pop());
	  });
	});
};

var createTask = function(req, res) {
	User.findById(req.body.userId, function(err, user) {
		var list = user.lists.filter(function(l) {
			return l._id.toString() === req.params.id;
		})[0];
	  list.tasks.push(req.body);
	  user.save(function(err, user) {
	    res.json(list.tasks.pop());
	  });
	});
};

// var update = function(req, res) {
//   req.record.set(req.body)
//   req.record.save(function (err, record) {
//     res.send(record);
//   });
// };

// var destroy = function(req, res) {
//   req.record.remove(function (err, record) {
//     res.send(record);
//   });
// };

  module.exports = {
  // index: index,
  create: create, //,
  createList: createList, //,
  createTask: createTask //,
  // update: update,
  // destroy: destroy
}