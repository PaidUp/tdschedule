'use strict';

//const logger = require('../../config/logger');

var validationError = function(err, cb) {
	//logger.warn('warn', err);
  return cb(err);
};

module.exports = function(wagner) {
	var ProductPriceCalculations = require('machinepack-product-price-calculations');

	function calculatePaidUp(params, cb) {
		ProductPriceCalculations.calculatePaidup(params).exec(
			{
				error: function(){
					cb('Error');
				},
				success : function(result){
					cb(null, result)
				}
			}
		)
	}

	function calculate(params, cb) {
		ProductPriceCalculations.calculate(params).exec(
			{
				error: function(){
					cb('Error');
				},
				success : function(result){
					cb(null, result)
				}
			}
		)
	}

	function calculateProcessing(params, cb) {
		ProductPriceCalculations.calculateProcessing(params).exec(
			{
				error: function(){
					cb(err);
				},
				success : function(result){
					cb(null, result)
				}
			}
		)
	}

	function calculateProcessingPaidUp(params, cb) {
		ProductPriceCalculations.calculateProcessingPaidup(params).exec(
			{
				error: function(err){
					cb(err);
				},
				success : function(result){
					console.log('params' , params);
					console.log('result' , result);
					cb(null, result)
				}
			}
		)
	}

	return {
		calculatePaidUp : calculatePaidUp,
		calculate: calculate,
		calculateProcessing: calculateProcessing,
		calculateProcessingPaidUp: calculateProcessingPaidUp
	}
}