'use strict'

var express = require('express')
var controller = require('./paymentPlan.controller');

var router = express.Router()
router.get('/', /*authCoreService.isAuthenticatedServer(config.TDTokens.me),*/ controller.create) 

// router.use('/metadata', require('./metadata/index'))
// router.use('/retry', require('./retry/index'))
// router.use('/schedule', require('./schedule/index'))
module.exports = router