'use strict'

var express = require('express')
var wagner = require('wagner-core')
var bodyParser = require('body-parser');

require('./api/adapters/schedule.adapter')(wagner).login()
require('./api/paymentPlan/paymentPlan.service')(wagner)

var app = express()
require('./config/express')(app);
require('./routes')(app, wagner)

app.listen(3000)
console.log('Listening on port 3000!')

exports = module.exports = app;