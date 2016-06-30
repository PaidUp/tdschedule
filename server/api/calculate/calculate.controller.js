'use strict';

// var config = require('../../config/environment');
// var User = require('./user.model');


// var mongoose = require('mongoose');
// var authService = require('../auth/auth.service');
const logger = require('../../config/logger');

var validationError = function(res, err) {
	logger.error('error', err);
  	return res.status(400).json(err);
};

module.exports = function (wagner) {
	var calculateService = require('./calculate.service')(wagner);

	function getPrice(req, res) {
		logger.debug('getPrice controller params req.body', req.body);

		calculateService.getPrice(req.body, function(err, price){
			if(err) return validationError(res, {message : err});
			logger.info('controller getPrice: '+JSON.stringify(price))
			return res.status(200).json(price);
		})
	}

	function getPrices(req, res) {
		logger.debug('getPrice controller params req.body', req.body);

		calculateService.getPrices(req.body.prices, function(err, prices){
			if(err) return validationError(res, {message : err});
			logger.info('controller getPrice: '+JSON.stringify(prices))
			return res.status(200).json({prices : prices});
		})
	}

	return {
		getPrice: getPrice,
		getPrices: getPrices
	}
}