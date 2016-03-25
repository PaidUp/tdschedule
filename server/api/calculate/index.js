'use strict'

module.exports = function (wagner) {
	let express = require('express')
	let router = express.Router()
	let config = require('../../config/environment')
	let authCoreService = require('TDCore').authCoreService
	let controller = require('./calculate.controller')(wagner)

	router.post('/price', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.getPrice)
	router.post('/prices', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.getPrices)

	return router
}
