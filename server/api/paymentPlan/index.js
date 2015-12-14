'use strict'

var express = require('express')
var router = express.Router()
module.exports = function (wagner) {
	var controller = require('./paymentPlan.controller')(wagner);
	router.post('/create/full', controller.createFull)
	router.post('/create', controller.create)
	router.put('/update', controller.update)
	router.get('/info/full/:paymentplanid', controller.infoFull)
	router.get('/info/:paymentplanid', controller.info)
	router.post('/list', controller.list)
	router.delete('/delete/:paymentplanid', controller.deleteOne)
	
	// router.use('/metadata', require('./metadata/index'))
	// router.use('/retry', require('./retry/index'))
	// router.use('/schedule', require('./schedule/index'))
	return router 
}