/**
 * Main application file
 */

'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express')
var wagner = require('wagner-core')
var bodyParser = require('body-parser');
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