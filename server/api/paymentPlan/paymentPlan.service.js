'use strict';

const logger = require('../../config/logger');

var validationError = function(err, cb) {
	logger.warn('warn', err);
  return cb(err);
};

module.exports = function(wagner) {
	var scheduleAdapter = require('../adapters/schedule.adapter')(wagner);
	function create(data, cb){
		scheduleAdapter.paymentPlanCreate(data, function(err, data){
			if(err) return validationError(err, cb);
			logger.info('create service data', data);
			return cb(null, data);
		})
	}

	function update(data, cb){
		scheduleAdapter.paymentPlanUpdate(data, function(err, data){
			if(err) return validationError(err, cb);
			logger.info('update service data', data);
			return cb(null, data);
		})
	}

	function info(filter, cb){
		scheduleAdapter.paymentPlanInfo(filter, function(err, data){
			if(err) return validationError(err, cb);
			logger.info('info service data', data);
			return cb(null, data);
		})
	}

	function list(filter, cb){
		scheduleAdapter.paymentPlanList(filter, function(err, data){
			if(err) return validationError(err, cb);
			logger.info('list service data', data);
			return cb(null, data);
		})
	}

	function deleteOne(deletefilter, cb){
		scheduleAdapter.paymentPlanDelete(deletefilter, function(err, data){
			if(err) return validationError(err, cb);
			logger.info('deleteOne service data', data);
			return cb(null, data);
		})
	}

	function createFull(data, cb){
		scheduleAdapter.paymentPlanCreateFull(data, function(err, data){
			if(err) return validationError(err, cb);
			logger.info('createFull service data', data);
			return cb(null, data);
		})
	}

	function infoFull(filter, cb){
		scheduleAdapter.paymentPlanInfoFull(filter, function(err, data){
			if(err) return validationError(err, cb);
			logger.info('infoFull service data', data);
			return cb(null, data);
		})
	}

	return {
		create: create,
		update: update,
		info: info,
		list: list,
		deleteOne: deleteOne,
		createFull: createFull,
		infoFull: infoFull
	}
}