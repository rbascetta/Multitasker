var moment = require('moment'),
	User   = require('../models/user');

var express = require('express');
var router = express.Router();


// load mongoose and connect to a database
var mongoose = require('mongoose');

// Require controllers.
var usersController = require('../controllers/users');
var tasksController = require('../controllers/tasks');

// LIST ROUTES
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

// AUTH
require('../controllers/token')(router);

// USER CRUD
router.get('/users',      usersController.index);
router.get('/users/:id',  usersController.show);
router.post('/users',     usersController.create);

// TASK CRUD
router.get('/tasks', function(req, res, next){
  res.send('Task Page');
});
router.post('/tasks', tasksController.create);



module.exports = router;
