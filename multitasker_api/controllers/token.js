var jwt  = require('jsonwebtoken'),
    User = require('../models/user'),
    env  = require('../config/environment');

// In order to simplify our process, we will handle the request
// inline here, instead of passing to controller files.
module.exports = function(router) {

  // User creation path:
  router.post('/token',

    // validations
    checkCredentials,
    checkUserExists,
    validateCredentials,

    // generate token
    function(req, res, next) {
      var token = jwt.sign(
        {
          email: req.user.email,
          name:  req.user.name,
          use:   'public_api'
        },
        env.SECRET_KEY,
        {
          expiresIn: 100000000
        }
      );

      res.json({
        success: true,
        message: 'Successfully generated token!!!!!!!!',
        token: token
      });
  });

  // *** VALIDATIONS ***

  function checkCredentials(req, res, next) {
    if (
      !req.body.email    ||
      !req.body.password
    ) {
      errorHandler(
        422,
        'Missing required field: email and/or password.',
        req, res
      );
    } else {
      next();
    }
  }

  function checkUserExists(req, res, next) {
    User.findOne({email: req.body.email}).exec()
      .catch(function(err) {
        next(err);
    }).then(function(user) {
        if (!user) {
          errorHandler(
            401,
            'Authentication failed: user does not exist.',
            req, res
          );
        } else {
          // add user to request!
          req.user = user;
          next();
        }
    });
  }

  function validateCredentials(req, res, next) {
    console.log(req.user, req.body)
    req.user.verifyPassword(req.body.password, function(err, valid) {
      if (!valid) {
        errorHandler(
          401,
          'Authentication failed: credentials incorrect.',
          req, res
        );
      } else {
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
};