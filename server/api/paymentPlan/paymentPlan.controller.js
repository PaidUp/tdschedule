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

	function create(req, res) {
		wagner.invoke(function(test){
			//paymentplanService.create(req.body, function(err, data) {
		    //if(err) return validationError(res, err);
		    return res.status(200).json({paymentplan : test.create(req.params.create)});
		  //})
		}, {connection: 'connection'})
	}

	function get(req, res) {
		wagner.invoke(function(test){
			//paymentplanService.create(req.body, function(err, data) {
		    //if(err) return validationError(res, err);
		    return res.status(200).json({paymentplan : test.get(req.params.get)});
		  //})
		}, {connection: 'connection'})
	}

	return {
		create: create,
		get: get
	}
}