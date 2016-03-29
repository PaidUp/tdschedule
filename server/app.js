/**
 * Main application file
 */

'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});

var express = require('express')
var wagner = require('wagner-core')
var config = require('./config/environment');

require('./api/adapters/schedule.adapter')(wagner).login()
require('./api/paymentPlan/paymentPlan.service')(wagner)

var app = express()
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app, wagner)



// Start server
if(config.env != 'test') {
  try{
    server.listen(config.port, config.ip, function () {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
  }catch(err){
    console.log('error:' , err);
  }
}

exports = module.exports = app;