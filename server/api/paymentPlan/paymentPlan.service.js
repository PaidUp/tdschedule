'use strict';

// var scheduleAdapter = require('./schedule.adapter.js')

/*function create(data, cb) {
	return cb(null,true)
}

exports.create = create*/
function create(create){
	return Math.random() + ' - ' + create
}

function get(get){
	return 'casa - ' + get
}

module.exports = function(wagner) { 
	return wagner.factory('test', function(connection){
		return {
			create: create,
			get: get
		}
	})
}