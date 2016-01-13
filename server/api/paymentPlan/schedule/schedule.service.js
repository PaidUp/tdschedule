/**
 * Created by riclara on 1/13/16.
 */
'use strict'

module.exports = function(wagner) {
    var scheduleAdapter = require('../../adapters/schedule.adapter')(wagner);

    function update(params, cb){
        scheduleAdapter.scheduleUpdate(params , function(err, data){
            if(err){
                return cb(err);
            }
            cb(null , data);
        })
    };

    return {
        update : update
    }

}