'use strict'

module.exports = function (wagner) {
    let express = require('express')
    let router = express.Router()
    let config = require('../../../config/environment')
    let authCoreService = require('TDCore').authCoreService
    let controller = require('./schedule.controller')(wagner)

    router.put('/update/information', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.updateInformation)

    return router
}