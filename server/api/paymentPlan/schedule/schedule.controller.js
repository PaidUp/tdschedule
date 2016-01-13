/**
 * Created by riclara on 1/13/16.
 */
'use strict'

module.exports = function(wagner){

    var scheduleService = require('./schedule.service')(wagner);

    function update(params , cb) {
        scheduleService.update(params , function(err , data){
            if(err){
                return cb(err)
            }
            cb(null , data);
        })
    }

    return {
        update : update
    }
}