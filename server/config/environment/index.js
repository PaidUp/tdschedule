'use strict';

var path = require('path');
// var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9002,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'tdschedule-secret'
  },

  commerce: {
    adapter: path.normalize(__dirname + '/../../..') + '/server/api/adapters/schedule.adapter',
    magento: {
      host: 'virtual',
      path: '/api/xmlrpc/',
      login: 'magento',
      pass: 'test4echo'
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all
// module.exports = _.merge(
//  all,
//  require('./' + process.env.NODE_ENV + '.js') || {});
