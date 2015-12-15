var express = require('express');
var router = express.Router();


// load mongoose and connect to a database
var mongoose = require('mongoose');

// Require controllers.
var usersController = require('../controllers/users');
var tasksController = require('../controllers/tasks');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function(req, res, next) {
  res.send('New User');

});

router.post('/users', usersController.create);

router.get('/tasks', function(req, res, next){
  res.send('Task Page');
});

router.post('/tasks', productController.create);


module.exports = router;