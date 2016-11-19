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

describe('test calculate service', function () {
  describe("TEST SET #1 - % PAIDUP FEE, NO DISCOUNT", function () {
    it('Row #1.1', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 95.24,
          originalPrice: 100,
          totalFee: 7.96,
          feePaidUp: 4.76,
          feeStripe: 3.20,
          owedPrice: 100,
          discount: 0
        }
          , data);
        done();
      });
    });

    it('Row #1.2', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 476.90,
          originalPrice: 500.75,
          totalFee: 38.67,
          feePaidUp: 23.85,
          feeStripe: 14.82,
          owedPrice: 500.75,
          discount: 0
        }
          , data);
        done();
      });
    });

    it('Row #1.3', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 952.38,
          originalPrice: 1000,
          totalFee: 76.92,
          feePaidUp: 47.62,
          feeStripe: 29.30,
          owedPrice: 1000,
          discount: 0
        }
          , data);
        done();
      });
    });

    it('Row #1.4', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 100,
          originalPrice: 100,
          totalFee: 8.20,
          feePaidUp: 5,
          feeStripe: 3.20,
          owedPrice: 100,
          discount: 0
        }
          , data);
        done();
      });
    });

    it('Row #1.5', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 500.75,
          originalPrice: 500.75,
          totalFee: 39.86,
          feePaidUp: 25.04,
          feeStripe: 14.82,
          owedPrice: 500.75,
          discount: 0
        }
          , data);
        done();
      });
    });

    it('Row #1.6', function (done) {

      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 1000,
          originalPrice: 1000,
          totalFee: 79.30,
          feePaidUp: 50,
          feeStripe: 29.30,
          owedPrice: 1000,
          discount: 0
        }
          , data);
        done();
      });







    });

    it('Row #1.7', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 92.19,
          originalPrice: 100,
          totalFee: 7.81,
          feePaidUp: 4.61,
          feeStripe: 3.2,
          owedPrice: 100,
          discount: 0
        }
          , data);
        done();
      });







    });

    it('Row #1.8', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 462.79,
          originalPrice: 500.75,
          totalFee: 37.96,
          feePaidUp: 23.14,
          feeStripe: 14.82,
          owedPrice: 500.75,
          discount: 0
        }
          , data);
        done();
      });
    });

    it('Row #1.9', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual({
          version: 'v2',
          basePrice: 924.48,
          originalPrice: 1000,
          totalFee: 75.52,
          feePaidUp: 46.22,
          feeStripe: 29.3,
          owedPrice: 1000,
          discount: 0
        }
          , data);
        done();
      });
    });


  })//set1




});

