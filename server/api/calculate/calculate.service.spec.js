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

    it('Row #1.10', function (done) {
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
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            "basePrice": 96.8,
            "discount": 0,
            "feePaidUp": 4.84,
            "feeStripe": 3.2,
            "originalPrice": 100,
            "owedPrice": 100,
            "totalFee": 8.04,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.11', function (done) {
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
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            "basePrice": 485.93,
            "discount": 0,
            "feePaidUp": 24.3,
            "feeStripe": 14.82,
            "originalPrice": 500.75,
            "owedPrice": 500.75,
            "totalFee": 39.12,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.12', function (done) {
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
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            "basePrice": 970.7,
            "discount": 0,
            "feePaidUp": 48.54,
            "feeStripe": 29.3,
            "originalPrice": 1000,
            "owedPrice": 1000,
            "totalFee": 77.84,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.13', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            "basePrice": 95.24,
            "discount": 0,
            "feePaidUp": 4.76,
            "feeStripe": 0.8,
            "originalPrice": 100,
            "owedPrice": 100,
            "totalFee": 5.56,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.14', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            "basePrice": 476.9,
            "discount": 0,
            "feePaidUp": 23.85,
            "feeStripe": 4.01,
            "originalPrice": 500.75,
            "owedPrice": 500.75,
            "totalFee": 27.86,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.15', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            "basePrice": 952.38,
            "discount": 0,
            "feePaidUp": 47.62,
            "feeStripe": 5,
            "originalPrice": 1000,
            "owedPrice": 1000,
            "totalFee": 52.62,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.16', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            "basePrice": 100,
            "discount": 0,
            "feePaidUp": 5,
            "feeStripe": 0.8,
            "originalPrice": 100,
            "owedPrice": 100,
            "totalFee": 5.8,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.17', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            "basePrice": 500.75,
            "discount": 0,
            "feePaidUp": 25.04,
            "feeStripe": 4.01,
            "originalPrice": 500.75,
            "owedPrice": 500.75,
            "totalFee": 29.05,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.18', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            "basePrice": 1000,
            "discount": 0,
            "feePaidUp": 50,
            "feeStripe": 5,
            "originalPrice": 1000,
            "owedPrice": 1000,
            "totalFee": 55,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.19', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            "basePrice": 94.48,
            "discount": 0,
            "feePaidUp": 4.72,
            "feeStripe": 0.8,
            "originalPrice": 100,
            "owedPrice": 100,
            "totalFee": 5.52,
            "version": "v2"
          }
          , data);
        done();
      });
    });

    it('Row #1.20', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 473.09,
            originalPrice: 500.75,
            totalFee: 27.66,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 23.65,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #1.21', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 947.62,
            originalPrice: 1000,
            totalFee: 52.38,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 47.38,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #1.22', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 99.2,
            originalPrice: 100,
            totalFee: 5.76,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 4.96,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #1.23', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 496.74,
            originalPrice: 500.75,
            totalFee: 28.85,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 24.84,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #1.24', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
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
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 995,
            originalPrice: 1000,
            totalFee: 54.75,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 49.75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

  })//set1

  describe("TEST SET #2 - % PAIDUP FEE, 15% DISCOUNT", function () {
    it('Row #2.1', function (done) {
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
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 80.95,
            originalPrice: 100,
            totalFee: 6.81,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 4.05,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #2.2', function (done) {
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
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 405.37,
            originalPrice: 500.75,
            totalFee: 32.91,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 20.27,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #2.3', function (done) {
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
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 809.52,
            originalPrice: 1000,
            totalFee: 65.43,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 40.48,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #2.4', function (done) {
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
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 7.01,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 4.25,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #2.5', function (done) {
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
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.64,
            originalPrice: 500.75,
            totalFee: 33.92,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 21.28,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #2.6', function (done) {
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
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 850,
            originalPrice: 1000,
            totalFee: 67.45,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 42.5,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #2.7', function (done) {
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
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 78.32,
            originalPrice: 100,
            totalFee: 6.68,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 3.92,
            feeStripe: 2.76
          }
          , data);
        done();
      });







    });

    it('Row #2.8', function (done) {
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
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 393.33,
            originalPrice: 500.75,
            totalFee: 32.31,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 19.67,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #2.9', function (done) {
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
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 785.76,
            originalPrice: 1000,
            totalFee: 64.24,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 39.29,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #2.10', function (done) {
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
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 82.24,
            originalPrice: 100,
            totalFee: 6.87,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 4.11,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #2.11', function (done) {
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
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 413,
            originalPrice: 500.75,
            totalFee: 33.29,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 20.65,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #2.12', function (done) {
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
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 825.05,
            originalPrice: 1000,
            totalFee: 66.2,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 41.25,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #2.13', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 80.95,
            originalPrice: 100,
            totalFee: 4.73,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 4.05,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #2.14', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 405.37,
            originalPrice: 500.75,
            totalFee: 23.68,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 20.27,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #2.15', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 809.52,
            originalPrice: 1000,
            totalFee: 45.48,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 40.48,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #2.16', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 4.93,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 4.25,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #2.17', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.64,
            originalPrice: 500.75,
            totalFee: 24.69,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 21.28,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #2.18', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 850,
            originalPrice: 1000,
            totalFee: 47.5,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 42.5,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #2.19', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 80.3,
            originalPrice: 100,
            totalFee: 4.7,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 4.02,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #2.20', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 402.13,
            originalPrice: 500.75,
            totalFee: 23.52,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 20.11,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #2.21', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 804.76,
            originalPrice: 1000,
            totalFee: 45.24,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 40.24,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #2.22', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 84.32,
            originalPrice: 100,
            totalFee: 4.9,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 4.22,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #2.23', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 422.23,
            originalPrice: 500.75,
            totalFee: 24.52,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 21.11,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #2.24', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 5,
        paidUpFlat: 0,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 845,
            originalPrice: 1000,
            totalFee: 47.25,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 42.25,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

  }) // set 2

  describe("TEST SET #3 - FLAT PAIDUP FEE, NO DISCOUNT", function () {
    it('Row #3.1', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 25,
            originalPrice: 100,
            totalFee: 78.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #3.2', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.75,
            originalPrice: 500.75,
            totalFee: 89.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #3.3', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 925,
            originalPrice: 1000,
            totalFee: 104.3,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #3.4', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 100,
            originalPrice: 100,
            totalFee: 78.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #3.5', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 500.75,
            originalPrice: 500.75,
            totalFee: 89.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #3.6', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 1000,
            originalPrice: 1000,
            totalFee: 104.3,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #3.7', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 21.8,
            originalPrice: 100,
            totalFee: 78.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #3.8', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 410.93,
            originalPrice: 500.75,
            totalFee: 89.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #3.9', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 895.7,
            originalPrice: 1000,
            totalFee: 104.3,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #3.10', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 96.8,
            originalPrice: 100,
            totalFee: 78.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #3.11', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 485.93,
            originalPrice: 500.75,
            totalFee: 89.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #3.12', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 970.7,
            originalPrice: 1000,
            totalFee: 104.3,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #3.13', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 25,
            originalPrice: 100,
            totalFee: 75.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #3.14', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.75,
            originalPrice: 500.75,
            totalFee: 79.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #3.15', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 925,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #3.16', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 100,
            originalPrice: 100,
            totalFee: 75.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #3.17', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 500.75,
            originalPrice: 500.75,
            totalFee: 79.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #3.18', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 1000,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #3.19', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 24.2,
            originalPrice: 100,
            totalFee: 75.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #3.20', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 421.74,
            originalPrice: 500.75,
            totalFee: 79.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #3.21', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 920,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    })

    it('Row #3.22', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 99.2,
            originalPrice: 100,
            totalFee: 75.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #3.23', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 496.74,
            originalPrice: 500.75,
            totalFee: 79.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #3.24', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 995,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

  }) // set 3

  describe("TEST SET #4 - FLAT PAIDUP FEE, 15% DISCOUNT", function () {
    it('Row #4.1', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 10,
            originalPrice: 100,
            totalFee: 77.76,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #4.2', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 350.64,
            originalPrice: 500.75,
            totalFee: 87.64,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #4.3', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 775,
            originalPrice: 1000,
            totalFee: 99.95,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #4.4', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 77.76,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #4.5', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.64,
            originalPrice: 500.75,
            totalFee: 87.64,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #4.6', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 850,
            originalPrice: 1000,
            totalFee: 99.95,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #4.7', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 7.23,
            originalPrice: 100,
            totalFee: 77.76,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #4.8', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 338,
            originalPrice: 500.75,
            totalFee: 87.64,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #4.9', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 750.05,
            originalPrice: 1000,
            totalFee: 99.95,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #4.10', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 82.24,
            originalPrice: 100,
            totalFee: 77.76,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #4.11', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 413,
            originalPrice: 500.75,
            totalFee: 87.64,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #4.12', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 825.05,
            originalPrice: 1000,
            totalFee: 99.95,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #4.13', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 10,
            originalPrice: 100,
            totalFee: 75.68,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #4.14', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 350.64,
            originalPrice: 500.75,
            totalFee: 78.41,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #4.15', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 775,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #4.16', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 75.68,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #4.17', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.64,
            originalPrice: 500.75,
            totalFee: 78.41,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #4.18', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 850,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #4.19', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 9.32,
            originalPrice: 100,
            totalFee: 75.68,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #4.20', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 347.23,
            originalPrice: 500.75,
            totalFee: 78.41,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #4.21', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 770,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #4.22', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 84.32,
            originalPrice: 100,
            totalFee: 75.68,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 75,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #4.23', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 422.23,
            originalPrice: 500.75,
            totalFee: 78.41,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 75,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #4.24', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 75,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 845,
            originalPrice: 1000,
            totalFee: 80,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 75,
            feeStripe: 5
          }
          , data);
        done();
      });
    });
  }) // set 4

  describe("TEST SET #5 - % PAIDUP FEE & FLAT PAIDUP FEE, NO DISCOUNT", function () {
    it('Row #5.1', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 94.06,
            originalPrice: 100,
            totalFee: 9.14,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 5.94,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #5.2', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 490.84,
            originalPrice: 500.75,
            totalFee: 24.73,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 9.91,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #5.3', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 985.15,
            originalPrice: 1000,
            totalFee: 44.15,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 14.85,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #5.4', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 100,
            originalPrice: 100,
            totalFee: 9.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 6,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #5.5', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 500.75,
            originalPrice: 500.75,
            totalFee: 24.83,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 10.01,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #5.6', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 1000,
            originalPrice: 1000,
            totalFee: 44.3,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #5.7', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 90.89,
            originalPrice: 100,
            totalFee: 9.11,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 5.91,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #5.8', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 476.17,
            originalPrice: 500.75,
            totalFee: 24.58,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 9.76,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #5.9', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 956.14,
            originalPrice: 1000,
            totalFee: 43.86,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 14.56,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #5.10', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 96.8,
            originalPrice: 100,
            totalFee: 9.17,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 5.97,
            feeStripe: 3.2
          }
          , data);
        done();
      });
    });

    it('Row #5.11', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 485.93,
            originalPrice: 500.75,
            totalFee: 24.68,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 9.86,
            feeStripe: 14.82
          }
          , data);
        done();
      });
    });

    it('Row #5.12', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 970.7,
            originalPrice: 1000,
            totalFee: 44.01,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 14.71,
            feeStripe: 29.3
          }
          , data);
        done();
      });
    });

    it('Row #5.13', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(

          {
            version: 'v2',
            basePrice: 94.06,
            originalPrice: 100,
            totalFee: 6.74,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 5.94,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #5.14', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 490.84,
            originalPrice: 500.75,
            totalFee: 13.92,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 9.91,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #5.15', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 985.15,
            originalPrice: 1000,
            totalFee: 19.85,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 14.85,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #5.16', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 100,
            originalPrice: 100,
            totalFee: 6.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 6,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #5.17', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 500.75,
            originalPrice: 500.75,
            totalFee: 14.02,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 10.01,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #5.18', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 1000,
            originalPrice: 1000,
            totalFee: 20,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #5.19', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 93.27,
            originalPrice: 100,
            totalFee: 6.73,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 5.93,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #5.20', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 486.88,
            originalPrice: 500.75,
            totalFee: 13.88,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 9.87,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #5.21', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(

          {
            version: 'v2',
            basePrice: 980.2,
            originalPrice: 1000,
            totalFee: 19.8,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 14.8,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #5.22', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 99.2,
            originalPrice: 100,
            totalFee: 6.79,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 5.99,
            feeStripe: 0.8
          }
          , data);
        done();
      });
    });

    it('Row #5.23', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 496.74,
            originalPrice: 500.75,
            totalFee: 13.98,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 9.97,
            feeStripe: 4.01
          }
          , data);
        done();
      });
    });

    it('Row #5.24', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 995,
            originalPrice: 1000,
            totalFee: 19.95,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 14.95,
            feeStripe: 5
          }
          , data);
        done();
      });
    });
  }) // set 5

  describe("TEST SET #6 - % PAIDUP FEE & FLAT PAIDUP FEE, 15% DISCOUNT", function () {
    it('Row #6.1', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 79.21,
            originalPrice: 100,
            totalFee: 8.55,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.79,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #6.2', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 416.48,
            originalPrice: 500.75,
            totalFee: 21.8,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.16,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #6.3', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 836.63,
            originalPrice: 1000,
            totalFee: 38.32,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.37,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #6.4', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 8.61,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.85,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #6.5', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.64,
            originalPrice: 500.75,
            totalFee: 21.9,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.26,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #6.6', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 850,
            originalPrice: 1000,
            totalFee: 38.45,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.5,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #6.7', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 76.47,
            originalPrice: 100,
            totalFee: 8.52,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.76,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #6.8', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 403.96,
            originalPrice: 500.75,
            totalFee: 21.68,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.04,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #6.9', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 811.93,
            originalPrice: 1000,
            totalFee: 38.07,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.12,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #6.10', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 82.24,
            originalPrice: 100,
            totalFee: 8.58,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.82,
            feeStripe: 2.76
          }
          , data);
        done();
      });
    });

    it('Row #6.11', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 413,
            originalPrice: 500.75,
            totalFee: 21.77,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.13,
            feeStripe: 12.64
          }
          , data);
        done();
      });
    });

    it('Row #6.12', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 825.05,
            originalPrice: 1000,
            totalFee: 38.2,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.25,
            feeStripe: 24.95
          }
          , data);
        done();
      });
    });

    it('Row #6.13', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 79.21,
            originalPrice: 100,
            totalFee: 6.47,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.79,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #6.14', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 416.48,
            originalPrice: 500.75,
            totalFee: 12.57,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.16,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #6.15', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 836.63,
            originalPrice: 1000,
            totalFee: 18.37,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.37,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #6.16', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 6.53,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.85,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #6.17', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 425.64,
            originalPrice: 500.75,
            totalFee: 12.67,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.26,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #6.18', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 850,
            originalPrice: 1000,
            totalFee: 18.5,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.5,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #6.19', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 78.53,
            originalPrice: 100,
            totalFee: 6.47,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.79,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #6.20', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 413.1,
            originalPrice: 500.75,
            totalFee: 12.54,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.13,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #6.21', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 831.68,
            originalPrice: 1000,
            totalFee: 18.32,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.32,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

    it('Row #6.22', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 100,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 84.32,
            originalPrice: 100,
            totalFee: 6.52,
            owedPrice: 85,
            discount: 15,
            feePaidUp: 5.84,
            feeStripe: 0.68
          }
          , data);
        done();
      });
    });

    it('Row #6.23', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 500.75,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 422.23,
            originalPrice: 500.75,
            totalFee: 12.63,
            owedPrice: 425.64,
            discount: 75.11,
            feePaidUp: 9.22,
            feeStripe: 3.41
          }
          , data);
        done();
      });
    });

    it('Row #6.24', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "bank_account",
        capAmount: 5,
        originalPrice: 1000,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 1,
        paidUpFlat: 5,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 845,
            originalPrice: 1000,
            totalFee: 18.45,
            owedPrice: 850,
            discount: 150,
            feePaidUp: 13.45,
            feeStripe: 5
          }
          , data);
        done();
      });
    });
  }) // set 6

});

