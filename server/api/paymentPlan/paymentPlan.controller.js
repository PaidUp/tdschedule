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
	var paymentplanService = require('./paymentPlan.service')(wagner);
	function create(req, res) {
		logger.info('create controller req.body', req.body);
		paymentplanService.create(req.body, function(err, id){
			if(err) return validationError(res, err);
			return res.status(200).json({paymentPlanId:id});
		})
	}

	function update(req, res) {
		logger.info('update controller req.body', req.body);
		paymentplanService.update(req.body, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json({updated:data});
		})
	}

	function info(req, res) {
		logger.info('create controller req.params', req.params);
		var filter = {paymentPlanId: req.params.paymentplanid}
		logger.info('info controller filter', filter);
		paymentplanService.info(filter, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json(data);
		})
	}

	function list(req, res) {
		logger.info('list controller req.body', req.body);
		paymentplanService.list(req.body, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json(data);
		})
	}

	function deleteOne(req, res) {
		logger.info('deleteOne controller req.params', req.params);
		var filter = {paymentPlanId: req.params.paymentplanid}
		logger.info('deleteOne controller filter', req.params);
		paymentplanService.deleteOne(filter, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json({deleted:data});
		})
	}

	function createFull(req, res) {
		logger.info('createFull controller req.body', req.body);
		paymentplanService.createFull(req.body, function(err, id){
			if(err) return validationError(res, err);
			return res.status(200).json({paymentPlanId:id});
		})
	}

	function infoFull(req, res) {
		logger.info('infoFull controller req.params', req.params);
		var filter = {paymentPlanId: req.params.paymentplanid}
		logger.info('infoFull controller filter', filter);
		paymentplanService.infoFull(filter, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json(data);
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