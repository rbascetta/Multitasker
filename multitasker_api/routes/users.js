var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');

/* GET users listing. */
router.get('/users/:id', usersController.findUsers);
router.get('/users/index', usersController.allUsers);

// router.get('', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;



