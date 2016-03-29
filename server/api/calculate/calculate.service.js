'use strict';

//const logger = require('../../config/logger');

var validationError = function(err, cb) {
	//logger.warn('warn', err);
  return cb(err);
};

module.exports = function(wagner) {
	var Calculations = require('machinepack-calculations');

	function getPrice(params, cb) {
        Calculations.productPrice(params).exec(
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

	function getPrices(params, cb) {
		let resp = [];
		params.forEach(function(price, idx, arr){
			getPrice(price, function(err, data){
				if(err){
					cb(err);
				}
				data.description = price.description;
				data.dateCharge = price.dateCharge;
				data.originalPrice = price.originalPrice;
				resp.push(data)
				if(idx === arr.length -1){
					cb(null , resp);
				}
			})
		});
	}

	return {
		getPrice : getPrice,
		getPrices : getPrices
	}
}