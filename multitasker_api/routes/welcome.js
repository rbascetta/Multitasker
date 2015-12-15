var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');

// root path:
router.get('/', welcomeController.index);


module.exports = router;