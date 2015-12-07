'use strict'

var express = require('express')
var wagner = require('wagner-core')

var app = express()
require('./routes')(app);

app.listen(3000)
console.log('Listening on port 3000!')
