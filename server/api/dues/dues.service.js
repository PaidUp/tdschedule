/**
 * Created by riclara on 1/13/16.
 */
'use strict'

module.exports = function(wagner) {
    var ObjectId = require('mongoose').Types.ObjectId;

    function generateDues(params, cb){

        cb(null , true);

    };




    return {
        generateDues : generateDues
    }

}