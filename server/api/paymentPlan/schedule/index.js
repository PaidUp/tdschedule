'use strict'

module.exports = function (wagner) {
    let express = require('express')
    let router = express.Router()
    let config = require('../../../config/environment')
    let authCoreService = require('TDCore').authCoreService
    let controller = require('./schedule.controller')(wagner)

    router.put('/information/update', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.updateInformation)
    router.post('/information/create', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.createInformation)
    router.delete('/information/delete/:entityId', authCoreService.isAuthenticatedServer(config.TDTokens.me), controller.deleteInformation)

    return router
}