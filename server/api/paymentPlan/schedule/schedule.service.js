/**
 * Created by riclara on 1/13/16.
 */
'use strict'

module.exports = function(wagner) {
    var ObjectId = require('mongoose').Types.ObjectId;
    var scheduleAdapter = require('../../adapters/schedule.adapter')(wagner);

    function updateInformation(params, cb){
        scheduleAdapter.scheduleInformationUpdate(params , function(err, data){
            if(err){
                return cb(err);
            }
            cb(null , data);
        })
    };

    function createInformation(params, cb){
        let paramNewSchedule = {paymentPlanId : params.paymentPlanId,
            scheduleData:
            {
                name : 'Add After',
            }}

        scheduleAdapter.scheduleCreate(paramNewSchedule, function(err , scheduleId){
            if(err){
                return cb(err)
            }

            let id = new ObjectId();

            params.informationData.push({name : 'id' , value : id.toString()});

            let paramNewInformation = {
                scheduleId:scheduleId,
                informationData: params.informationData
            }

            scheduleAdapter.scheduleInformationUpdate(paramNewInformation , function(err1, data){
                if(err1){
                    return cb(err1);
                }
                cb(null , data);
            })

        });

    };

    function deleteInformation(paymentPlanId, cb){
        scheduleAdapter.scheduleDelete({paymentPlanId : paymentPlanId} , function(err, data){
            if(err){
                return cb(err);
            }
            cb(null , data);
        })
    };

    return {
        updateInformation : updateInformation,
        createInformation : createInformation,
        deleteInformation : deleteInformation
    }

}