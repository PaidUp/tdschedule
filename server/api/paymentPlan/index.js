'use strict'

var express = require('express')


var router = express.Router()
module.exports = function (wagner) {
	var controller = require('./paymentPlan.controller')(wagner);
	router.get('/get/:get', controller.get)
	router.get('/create/:create/', controller.create)
	// router.use('/metadata', require('./metadata/index'))
	// router.use('/retry', require('./retry/index'))
	// router.use('/schedule', require('./schedule/index'))
	return router 
}