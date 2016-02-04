/**
 * Created by riclara on 1/13/16.
 */
'use strict'

var validationError = function(res, err) {
    return res.status(422).json(err);
};

module.exports = function(wagner){

    var scheduleService = require('./schedule.service')(wagner);



    function updateInformation(req , res) {
        if(!req.body.informationData){
            validationError(res , {message : 'informationData is required'})
        }
        if(!req.body.scheduleId){
            validationError(res , {message : 'scheduleId is required'})
        }
        scheduleService.updateInformation(req.body , function(err , data){
            if(err) {
                return validationError(res, err);
            }
            return res.status(200).json(data);
        })
    }

    function createInformation(req , res) {
        if(!req.body.informationData){
            return validationError(res , {message : 'informationData is required'})
        }
        if(!req.body.paymentPlanId){
            return validationError(res , {message : 'paymentPlanId is required'})
        }

        scheduleService.createInformation(req.body , function(err , data){
            if(err) {
                return validationError(res, err);
            }
            res.status(200).json(data);
        })
    }

    function deleteInformation(req , res) {
        if(!req.params.paymentPlanId){
            validationError(res , {message : 'paymentPlanId is required'})
        }
        scheduleService.deleteInformation(req.params.paymentPlanId , function(err , data){
            if(err) {
                return validationError(res, err);
            }
            return res.status(200).json(data);
        })
    }

    return {
        updateInformation : updateInformation,
        createInformation : createInformation,
        deleteInformation : deleteInformation}
}