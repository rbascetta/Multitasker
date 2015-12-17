// Require resource's model(s).
var User = require("../models/user");

var index = function (req, res, next) {
  User.find({}, function(error, users) {
    if (error) console.log(error);
    res.json(users);
  })
};

var show = function(req, res, next){
  User.findById(req.params.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.json(user);
  });
};

// create a new user
var create = function (req, res, next) {
  console.log({message: req.body});
  User.create(req.body, function(err, user){
    if (err) res.send(err);
    res.json(user);
  });
}

var showCurrentUser = function(req, res, next){
  res.json(req.user);
};

module.exports = {
  show:   show,
  create: create,
  index:  index,
  showCurrentUser: showCurrentUser
};