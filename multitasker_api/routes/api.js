var moment = require('moment'),
	  User   = require('../models/user'),
	  env    = require('../config/environment'),
	  jwt    = require('jsonwebtoken');

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

router.get('/me',
	checkForToken, validateToken, loadCurrentUser,
	usersController.showCurrentUser
);

// TASK CRUD
router.get('/tasks', function(req, res, next){
  res.send('Task Page');
});
router.post('/tasks', 
	checkForToken, validateToken, loadCurrentUser,
	tasksController.create
);


// TOKEN VALIDATION AND USER LOADING

function loadCurrentUser(req, res, next) {
	User.findOne({email: req.decoded.email}, function(err, user) {
		if (err) res.send(err);
		req.user = user;

		next();
	});
}

// *** VALIDATIONS ***

function checkForToken(req, res, next) {
  var authorizationHeader = req.get('Authorization'),
      method,
      token;

  // conditionally set all the variables...
  if (authorizationHeader) authorizationHeader = authorizationHeader.split(' ');
  if (authorizationHeader && authorizationHeader.length > 0) {
    method = authorizationHeader[0];
  }
  if (authorizationHeader && authorizationHeader.length > 1) {
    token = authorizationHeader[1];
  }

  if (!authorizationHeader) {
    errorHandler(
      400,
      'Authorization failed (invalid_request): missing necessary header. ' +
      'See https://tools.ietf.org/html/rfc6750#section-2.1',
      req, res
    );
  } else
  if (method.toLowerCase() !== 'bearer' && method.toLowerCase() !== 'token') {
    errorHandler(
      400,
      'Authorization failed (invalid_request): Authorization method ' +
      'must be \'bearer\' or \'token.\'',
      req, res
    );
  } else
  if (!token) {
    errorHandler(
      401,
      'Authorization failed (invalid_token): token missing.',
      req, res
    );
  } else {
    // add the token to the request
    req.token = token;
    next();
  }
}

function validateToken(req, res, next) {
  jwt.verify(req.token, env.SECRET_KEY, function(err, decoded) {
    if (err && err.name === 'TokenExpiredError') {
      errorHandler(
        401,
        'Authorization failed (invalid_token): token epired at ' + err.expiredAt + '.',
        req, res
      );
    } else
    if (err) {
      errorHandler(
        401,
        'Authorization failed (invalid_token): token malformed.',
        req, res
      );
    } else {
      // add the decoded token to the request
      req.decoded = decoded;
      next();
    }
  });
}

function errorHandler(code, message, req, res) {
  var title = '';
  var responseJson = {};

  res.status(code);
  switch(code) {
    case 400: title = '400 Bad Request';  break;
    case 401: title = '401 Unauthorized'; break;
    case 403: title = '403 Forbidden';    break;
    case 404: title = '404 Not Found';    break;
    case 422: title = '422 Unprocessable Entity';
  }

  responseJson.response = title;
  if (message && message.length > 0) responseJson.message = message;

  res.json(responseJson);
}


module.exports = router;
