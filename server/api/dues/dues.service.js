/**
 * Created by riclara on 1/13/16.
 */
'use strict'

module.exports = function(wagner) {
    var ObjectId = require('mongoose').Types.ObjectId;
    var calculateService = require('../calculate/calculate.service')(wagner);
    var moment = require('moment');

    function generateDues(params, cb){



        //option 1
        if(!params.paysFees.processing && params.paysFees.collections){
            return cb("Option doesn't implemented" );
        }

        //option 2
        else if(!params.paysFees.processing && !params.paysFees.collections){
            builResult('calculate' , params, function(err, data){
                if(err){
                    return cb(err);
                }
                console.log('DAta' , data);
                return cb(null, data);
            })
        }

        //option 3
        else if(params.paysFees.processing && params.paysFees.collections){
            builResult('calculateProcessingPaidUp' , params, function(err, data){
                if(err){
                    return cb(err);
                }
                return cb(null, data);
            })
        }

        //option 4
        else if(params.paysFees.processing && !params.paysFees.collections){
            builResult('calculateProcessing' , params, function(err, data){
                if(err){
                    return cb(err);
                }
                return cb(null, data);
            })
        } else {
            cb("Don't match any option");
        }
    };


    function validateDate(stringDate){
        let dateCharge = moment(stringDate, "MM/DD7YYYY HH:mm");
        return dateCharge.isValid()
    }

    function builResult(method, params, cb){
        let result = [];

        params.paymentPlans[params.paymentPlanSelected].dues.forEach(function(ele, idx, arr){

            if(!validateDate(ele.dateCharge)){
                return cb('Not is a valid date: '+ele.dateCharge);
            }

            calculateService[method]({
                originalPrice : ele.amount,
                stripePercent : params.processingFees.cardFeeActual,
                stripeFlat : params.processingFees.cardFeeFlatActual,
                paidUpFee : params.collectionsFee.fee,
                discount : ele.applyDiscount ? ele.discount : 0
            }, function(err, data){

                if(err){
                    return cb(err);
                }

                result.push({
                    amount : data.owedPrice,
                    discount : data.discount,
                    dateCharge : ele.dateCharge,
                    description : ele.description
                })

                if(params.paymentPlans[params.paymentPlanSelected].dues.length -1  === idx){
                    cb(null, result);
                }
            })
        });
    }

    return {
        generateDues : generateDues
    }

}