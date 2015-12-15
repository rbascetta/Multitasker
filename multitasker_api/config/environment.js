var _ = require('lodash');

var localEnvVars = {
  TITLE:      'multitasker',
  SAFE_TITLE: 'multitasker'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
