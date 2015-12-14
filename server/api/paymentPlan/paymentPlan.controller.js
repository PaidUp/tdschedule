'use strict';

// var config = require('../../config/environment');
// var User = require('./user.model');


// var mongoose = require('mongoose');
// var authService = require('../auth/auth.service');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

module.exports = function (wagner) {
	var paymentplanService = require('./paymentPlan.service')(wagner);
	function create(req, res) {
		paymentplanService.create(req.body, function(err, id){
			if(err) return validationError(res, err);
			return res.status(200).json({paymentPlanId:id});
		})
	}

	function update(req, res) {
		paymentplanService.update(req.body, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json({updated:data});
		})
	}

	function info(req, res) {
		var filter = {paymentPlanId: req.params.paymentplanid}
		paymentplanService.info(filter, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json(data);
		})
	}

	function list(req, res) {
		paymentplanService.list(req.body, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json(data);
		})
	}

	function deleteOne(req, res) {
		var filter = {paymentPlanId: req.params.paymentplanid}
		paymentplanService.deleteOne(filter, function(err, data){
			if(err) return validationError(res, err);
			return res.status(200).json({deleted:data});
		})
	}

	function createFull(req, res) {
		paymentplanService.createFull(req.body, function(err, id){
			if(err) return validationError(res, err);
			return res.status(200).json({paymentPlanId:id});
		})
	}

	function infoFull(req, res) {
		var filter = {paymentPlanId: req.params.paymentplanid}
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