'use strict';

// var config = require('../../config/environment');
// var User = require('./user.model');
var paymentplanService = require('./paymentPlan.service');

// var mongoose = require('mongoose');
// var authService = require('../auth/auth.service');

var validationError = function(res, err) {
  return res.status(422).json(err);
};



module.exports = function (wagner) {
	var scheduleAdapter = require('../adapters/schedule.adapter')(wagner);
	function create(req, res) {
		scheduleAdapter.paymentPlanList({}, function(err, data){
			//if(err) return validationError(res, err);
			return res.status(200).json(data);
		})
	}

	function update(req, res) {
		return res.status(200).json({paymentplan : 'update'});
	}

	function info(req, res) {
		return res.status(200).json({paymentplan : 'info'});
	}

	function list(req, res) {
		return res.status(200).json({paymentplan : 'list'});
	}

	function info(req, res) {
		return res.status(200).json({paymentplan : 'info'});
	}

	function deleteOne(req, res) {
		return res.status(200).json({paymentplan : 'delete'});
	}

	return {
		create: create,
		update: update,
		info: info,
		list: list,
		deleteOne: deleteOne
	}
}