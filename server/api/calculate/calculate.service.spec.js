/**
 * Created by riclara on 2/19/16.
 */

'use strict'

const should = require('should')
const assert = require('chai').assert
var wagner = require('wagner-core');
var calculateService = require('./calculate.service')(wagner);

/**
 * User Pays
 * +===========+==============+===========+
 * |  Option   |  Processing  |  PaidUp   |
 * |===========|==============|===========|
 * |  Option 1 |     NO       |    YES    |
 * |-----------|--------------|-----------|
 * |  Option 2 |     NO       |     NO    |
 * |-----------|--------------|-----------|
 * |  Option 3 |     YES      |     YES   |
 * |-----------|--------------|-----------|
 * |  Option 4 |     YES      |     NO    |
 * +--------------------------------------+
 *
 */

describe('test calculate service' , function(){

    it('calculate paidup -- option 1' , function(done){
        calculateService.getPrice({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 0,
            payProcessing : false,
            payCollecting : true
        } , function(err, data){
            assert.equal(105 , data.owedPrice);
            done();
        });
    });

    it('calculate -- option 2' , function(done){
        calculateService.getPrice({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 0,
            payProcessing : false,
            payCollecting : false
        } , function(err, data){
            assert.equal(100 , data.owedPrice);
            done();
        });
    });

    it('calculateProcessingPaidUp -- option 3' , function(done){
        calculateService.getPrice({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 0,
            payProcessing : true,
            payCollecting : true
        } , function(err, data){
            assert.equal(108.45 , data.owedPrice);
            done();
        });
    });

    it('calculateProcessing option 4' , function(done){
        calculateService.getPrice({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 0,
            payProcessing : true,
            payCollecting : false
        } , function(err, data){
            assert.equal(103.29 , data.owedPrice);
            done();
        });
    });
});