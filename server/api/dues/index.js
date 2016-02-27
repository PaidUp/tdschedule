'use strict'

module.exports = function (wagner) {
	let express = require('express')
	let router = express.Router()
	let config = require('../../config/environment')
	let authCoreService = require('TDCore').authCoreService
	let controller = require('./dues.controller')(wagner)

	router.post('/generate', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.generateDues)

	return router
}
