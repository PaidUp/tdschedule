'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/tdschedule-test'
    },
    commerce: {
        magento: {
            host: 'develop.getpaidup.com',
            port: 8888,
            path: '/api/xmlrpc/',
            login: 'magento',
            pass: 'Sv38SJVR'
        },
        paymentPlan:{
            intervalElapsed:5,
            intervalType:'minutes'
        }
    },
    nodePass: {
      me:{
          me:'tdschedule-secret'
      }
    }

};
