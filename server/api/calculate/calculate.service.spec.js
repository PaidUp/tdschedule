/**
 * Created by riclara on 2/19/16.
 */

'use strict'

const should = require('should')
const assert = require('chai').assert
var wagner = require('wagner-core');
var calculateService = require('./calculate.service')(wagner);

describe('test calculate service' , function(){

    it('calculate' , function(done){
        calculateService.calculate({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 0
        } , function(err, data){
            assert.equal(100 , data.owedPrice);
            assert.equal(91.8 , data.payout);
            done();
        });
    });

    it('calculateProcessing' , function(done){
        calculateService.calculateProcessing({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 0
        } , function(err, data){
            //console.log(data)
            //assert.equal(100 , data.owedPrice);
            //assert.equal(91.8 , data.payout);
            done();
        });
    });

    it('calculateProcessingPaidUp' , function(done){
        calculateService.calculateProcessingPaidUp({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 0
        } , function(err, data){
            assert.equal(103.45 , data.owedPrice);
            assert.equal(95.15 , data.payout);
            done();
        });
    });
});