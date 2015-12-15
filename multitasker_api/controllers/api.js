// var Tasks = require('../models/tasks');
// var User = require('../models/users');

// var index = function(req, res) {
//   Task.find({}, function(err, records){
//       res.send(records);
//   });
// };

// var create = function(req, res) {
//   Tasks.create(req.body, function(err, record){
//     if(err) {
//       res.send(err);
//     }
//     res.send(record);
//   });
// };

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

// var show = function(req, res, next){
//   User.findById(req.params.id, function(error, user){
//     if (error) res.json({message: 'Could not find user because ' + error});
//     res.render('users/show', {user: req.user})
//   });
// };

// // create a new user
// var create = function (req, res, next) {
//   console.log({message: req.body});
//   User.create(req.body, function(err, user){
//     if (err) {
//       res.send(err);
//     }
//       res.json(user);
//   });
// }


//   module.exports = {
//   index: index,
//   create: create,
//   update: update,
//   show: show,
//   destroy: destroy
// }
