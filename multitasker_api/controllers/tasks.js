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
  create: create //,
  // update: update,
  // destroy: destroy
}