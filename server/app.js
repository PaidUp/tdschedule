'use strict'

var express = require('express')
var wagner = require('wagner-core')

require('./api/adapters/schedule.adapter')().login()
require('./api/paymentPlan/paymentPlan.service')(wagner)

var app = express()
require('./routes')(app, wagner);

app.listen(3000)
console.log('Listening on port 3000!')
