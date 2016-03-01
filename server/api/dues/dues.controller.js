'use strict';

// var config = require('../../config/environment');
// var User = require('./user.model');


// var mongoose = require('mongoose');
// var authService = require('../auth/auth.service');
const logger = require('../../config/logger');

var validationError = function(res, err) {
	logger.error('error', err);
  	return res.status(422).json(err);
};

module.exports = function (wagner) {
	var duesService = require('./dues.service')(wagner);

	function generateDues(req, res) {
		logger.debug('generate dues controller params req.body', req.body);

		console.log('req.body' , req.body);

		if(!req.body.paymentPlanSelected){
			return validationError(res, {message : "paymentPlanSelected is required"});
		}

		if(!req.body.processingFees){
			return validationError(res, {message : "processingFees is required"});
		}

		duesService.generateDues(req.body, function(err, dues){
			if(err) return validationError(res, {message : err});
			logger.debug('duesController.generateDues return: '+JSON.stringify(dues))
			return res.status(200).json(dues);
		})
	}



	return {
		generateDues: generateDues
	}
}