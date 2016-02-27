
'use strict'

var express = require('express')

var router = express.Router()

module.exports = function (wagner) {
	router.use('/paymentplan', require('./paymentPlan/index')(wagner));
	router.use('/dues', require('./dues/index')(wagner));
	return router 
}