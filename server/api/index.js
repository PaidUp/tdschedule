
'use strict'

var express = require('express')

var router = express.Router()

module.exports = function (wagner) {
	router.use('/paymentplan', require('./paymentPlan/index')(wagner))
	return router 
}