'use strict';

// var config = require('../../config/environment');
// var User = require('./user.model');
var paymentplanService = require('./paymentPlan.service');
// var mongoose = require('mongoose');
// var authService = require('../auth/auth.service');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

exports.create = function(req, res) {
  paymentplanService.create(req.body, function(err, data) {
    if(err) return validationError(res, err);
    return res.status(200).json({paymentplan : data});
  });
};