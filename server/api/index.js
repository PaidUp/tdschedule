
'use strict'

var express = require('express')

var router = express.Router()
router.use('/paymentplan', require('./paymentPlan/index'))
module.exports = router