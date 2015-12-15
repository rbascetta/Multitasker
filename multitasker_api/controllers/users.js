// Require resource's model(s).
var User = require('../models/user');

var allUsers = function(req, res, next){

  User.find({}, function(error, users){
    res.json(users);

  });
};
//       'users/index', {users: users}
      // users
  
  

module.exports = {
  allUsers: allUsers,
  // show:  show
};
