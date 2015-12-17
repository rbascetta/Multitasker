var moment = require('moment'),
	User   = require('../models/user');

var express = require('express');
var router = express.Router();


// load mongoose and connect to a database
var mongoose = require('mongoose');

// Require controllers.
var usersController = require('../controllers/users');
var tasksController = require('../controllers/tasks');
// var tokenController = require('../controllers/token')(app, errorHandler);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
  	paths: [
  	  "/api/tasks",
  	  "/api/tasks/:task_id",
  	  "/api/users",
  	  "/api/users/:user_id",
  	  "/api/me",
  	  "/api/token"
  	]
  });
});

router.get('/users', usersController.index);
router.post('/users', usersController.create);


router.get('/tasks', function(req, res, next){
  res.send('Task Page');
});

router.post('/tasks', tasksController.create);

// // Post token

// router.post('/token', tokenController);


module.exports = router;