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
            originalPrice : 105,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 10,
            payProcessing : false,
            payCollecting : true
        } , function(err, data){
            assert.deepEqual({ originalPrice: 105,
                totalFee: 7.54,
                feePaidUp: 4.50,
                feeStripe: 3.04,
                owedPrice: 94.50,
                discount: 10.50 }
                , data);
            done();
        });
    });

    it('calculate -- option 2' , function(done){
        calculateService.getPrice({
            originalPrice : 100,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 10,
            payProcessing : false,
            payCollecting : false
        } , function(err, data){
            assert.deepEqual({ originalPrice: 100,
                    totalFee: 7.41,
                    feePaidUp: 4.50,
                    feeStripe: 2.91,
                    owedPrice: 90,
                    discount: 10 }
                , data);
            done();
        });
    });

    it('calculateProcessingPaidUp -- option 3' , function(done){
        calculateService.getPrice({
            originalPrice : 40,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 10,
            payProcessing : true,
            payCollecting : true
        } , function(err, data){
            assert.deepEqual({ originalPrice: 40,
                    totalFee: 2.99,
                    feePaidUp: 1.65,
                    feeStripe: 1.34,
                    owedPrice: 36.00,
                    discount: 4 }
                , data);
            done();
        });
    });

    it('calculateProcessing option 4' , function(done){
        calculateService.getPrice({
            originalPrice : 103.29,
            stripePercent : 2.9,
            stripeFlat : 0.30,
            paidUpFee : 5,
            discount : 10,
            payProcessing : true,
            payCollecting : false
        } , function(err, data){
            assert.deepEqual({ originalPrice: 103.29,
                    totalFee: 7.50,
                    feePaidUp: 4.50,
                    feeStripe: 3.00,
                    owedPrice: 92.96,
                    discount: 10.33 }
                , data);
            done();
        });
    });
});