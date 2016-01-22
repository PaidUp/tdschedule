'use strict'

module.exports = function (wagner) {
	let express = require('express')
	let router = express.Router()
	let config = require('../../config/environment')
	let authCoreService = require('TDCore').authCoreService
	let controller = require('./paymentPlan.controller')(wagner)

	router.post('/create/full', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.createFull)
	router.post('/create', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.create)
	router.put('/update', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.update)
	router.get('/info/full/:paymentplanid', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.infoFull)
	router.get('/info/:paymentplanid', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.info)
	router.post('/list', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.list)
	router.delete('/delete/:paymentplanid', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.deleteOne)
	
	// router.use('/metadata', require('./metadata/index'))
	// router.use('/retry', require('./retry/index'))
	router.use('/schedule', require('./schedule/index')(wagner))
	return router 
}
