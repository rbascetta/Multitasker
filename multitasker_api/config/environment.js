var _ = require('lodash');

var localEnvVars = {
  TITLE:      'MultiTasker!',
  SAFE_TITLE: 'multitasker',
  SECRET_KEY: 'christmastree'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
