'use strict';

//const logger = require('../../config/logger');

var validationError = function(err, cb) {
	//logger.warn('warn', err);
  return cb(err);
};

module.exports = function(wagner) {
	///var scheduleAdapter = require('../adapters/schedule.adapter')(wagner);
	var calculateIndex = require('../../machines/calculate-prices');
	var calculateMachine = require('machine').build(calculateIndex.calculate);
	var calculateProcessingMachine = require('machine').build(calculateIndex.calculateProcessing);
	var calculateProcessingPaidUpMachine = require('machine').build(calculateIndex.calculateProcessingPaidUp);
	var calculatePaidUpMachine = require('machine').build(calculateIndex.calculatePaidUp);

	function calculatePaidUp(params, cb) {
		calculatePaidUpMachine(params).exec(
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
		calculateMachine(params).exec(
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
		calculateProcessingMachine(params).exec(
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
		calculateProcessingPaidUpMachine(params).exec(
			{
				error: function(err){
					cb(err);
				},
				success : function(result){
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