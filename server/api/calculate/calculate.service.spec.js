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
    it('Row #1.1', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 85,
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
            basePrice: 68.81,
            originalPrice: 85,
            totalFee: 5.84,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.44,
            feeStripe: 2.4
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
        originalPrice: 425.64,
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
        assert.deepEqual({
          version: 'v2',
          basePrice: 344.56,
          originalPrice: 425.64,
          totalFee: 28.02,
          owedPrice: 361.79,
          discount: 63.85,
          feePaidUp: 17.23,
          feeStripe: 10.79
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
        originalPrice: 850,
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
            basePrice: 688.1,
            originalPrice: 850,
            totalFee: 55.66,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 34.41,
            feeStripe: 21.25
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
        originalPrice: 85,
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
            basePrice: 72.25,
            originalPrice: 85,
            totalFee: 6.01,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.61,
            feeStripe: 2.4
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
        originalPrice: 425.64,
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
            basePrice: 361.79,
            originalPrice: 425.64,
            totalFee: 28.88,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.09,
            feeStripe: 10.79
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
        originalPrice: 850,
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
            basePrice: 722.5,
            originalPrice: 850,
            totalFee: 57.38,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 36.13,
            feeStripe: 21.25
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
        originalPrice: 85,
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
            basePrice: 66.53,
            originalPrice: 85,
            totalFee: 5.73,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.33,
            feeStripe: 2.4
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
        originalPrice: 425.64,
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
            basePrice: 334.28,
            originalPrice: 425.64,
            totalFee: 27.5,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 16.71,
            feeStripe: 10.79
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
        originalPrice: 850,
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
            basePrice: 667.85,
            originalPrice: 850,
            totalFee: 54.64,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 33.39,
            feeStripe: 21.25
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
        originalPrice: 85,
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
            basePrice: 69.85,
            originalPrice: 85,
            totalFee: 5.89,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.49,
            feeStripe: 2.4
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
        originalPrice: 425.64,
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
            basePrice: 351,
            originalPrice: 425.64,
            totalFee: 28.34,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 17.55,
            feeStripe: 10.79
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
        originalPrice: 850,
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
            basePrice: 701.25,
            originalPrice: 850,
            totalFee: 56.31,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 35.06,
            feeStripe: 21.25
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
        originalPrice: 85,
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
            basePrice: 68.81,
            originalPrice: 85,
            totalFee: 4.02,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.44,
            feeStripe: 0.58
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
        originalPrice: 425.64,
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
            basePrice: 344.56,
            originalPrice: 425.64,
            totalFee: 20.12,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 17.23,
            feeStripe: 2.89
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
        originalPrice: 850,
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
            basePrice: 688.1,
            originalPrice: 850,
            totalFee: 39.41,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 34.41,
            feeStripe: 5
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
        originalPrice: 85,
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
            basePrice: 72.25,
            originalPrice: 85,
            totalFee: 4.19,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.61,
            feeStripe: 0.58
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
        originalPrice: 425.64,
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
            basePrice: 361.79,
            originalPrice: 425.64,
            totalFee: 20.98,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.09,
            feeStripe: 2.89
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
        originalPrice: 850,
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
            basePrice: 722.5,
            originalPrice: 850,
            totalFee: 41.13,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 36.13,
            feeStripe: 5
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
        originalPrice: 85,
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
            basePrice: 68.26,
            originalPrice: 85,
            totalFee: 3.99,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.41,
            feeStripe: 0.58
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
        originalPrice: 425.64,
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
            basePrice: 341.81,
            originalPrice: 425.64,
            totalFee: 19.98,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 17.09,
            feeStripe: 2.89
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
        originalPrice: 850,
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
            basePrice: 683.33,
            originalPrice: 850,
            totalFee: 39.17,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 34.17,
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
        originalPrice: 85,
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
            basePrice: 71.67,
            originalPrice: 85,
            totalFee: 4.16,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 3.58,
            feeStripe: 0.58
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
        originalPrice: 425.64,
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
            basePrice: 358.9,
            originalPrice: 425.64,
            totalFee: 20.84,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 17.95,
            feeStripe: 2.89
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
        originalPrice: 850,
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
            basePrice: 717.5,
            originalPrice: 850,
            totalFee: 40.88,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 35.88,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

  }) // set 2

  describe("TEST SET #3 - FLAT PAIDUP FEE, NO DISCOUNT", function () {
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 18.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 3.2
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 485.75,
            originalPrice: 500.75,
            totalFee: 29.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 14.82
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 985,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 100,
            originalPrice: 100,
            totalFee: 18.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 3.2
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 500.75,
            originalPrice: 500.75,
            totalFee: 29.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 14.82
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
        paidUpFee: 0,
        paidUpFlat: 15,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 81.8,
            originalPrice: 100,
            totalFee: 18.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 3.2
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 470.93,
            originalPrice: 500.75,
            totalFee: 29.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 14.82
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 955.7,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 96.8,
            originalPrice: 100,
            totalFee: 18.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 3.2
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 485.93,
            originalPrice: 500.75,
            totalFee: 29.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 14.82
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 970.7,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 85,
            originalPrice: 100,
            totalFee: 15.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 0.8
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 485.75,
            originalPrice: 500.75,
            totalFee: 19.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 4.01
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 985,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 100,
            originalPrice: 100,
            totalFee: 15.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 0.8
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 500.75,
            originalPrice: 500.75,
            totalFee: 19.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 4.01
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
        paidUpFee: 0,
        paidUpFlat: 15,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 84.2,
            originalPrice: 100,
            totalFee: 15.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
            feeStripe: 0.8
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 481.74,
            originalPrice: 500.75,
            totalFee: 19.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 980,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 99.2,
            originalPrice: 100,
            totalFee: 15.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 496.74,
            originalPrice: 500.75,
            totalFee: 19.01,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 15,
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
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 995,
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

  }) // set 3

  describe("TEST SET #4 - FLAT PAIDUP FEE, 15% DISCOUNT", function () {
    it('Row #1.1', function (done) {
      calculateService.getPrice({
        version: 'v2',
        type: "card",
        capAmount: 5,
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 57.25,
            originalPrice: 85,
            totalFee: 17.4,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 2.4
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 346.79,
            originalPrice: 425.64,
            totalFee: 25.79,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 10.79
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 707.5,
            originalPrice: 850,
            totalFee: 36.25,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
            feeStripe: 21.25
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
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 72.25,
            originalPrice: 85,
            totalFee: 17.4,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 2.4
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 361.79,
            originalPrice: 425.64,
            totalFee: 25.79,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 10.79
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 722.5,
            originalPrice: 850,
            totalFee: 36.25,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
            feeStripe: 21.25
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
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 54.85,
            originalPrice: 85,
            totalFee: 17.4,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 2.4
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 336,
            originalPrice: 425.64,
            totalFee: 25.79,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 10.79
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 686.25,
            originalPrice: 850,
            totalFee: 36.25,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
            feeStripe: 21.25
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
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 69.85,
            originalPrice: 85,
            totalFee: 17.4,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 2.4
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 351,
            originalPrice: 425.64,
            totalFee: 25.79,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 10.79
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 701.25,
            originalPrice: 850,
            totalFee: 36.25,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
            feeStripe: 21.25
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
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 57.25,
            originalPrice: 85,
            totalFee: 15.58,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 0.58
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 346.79,
            originalPrice: 425.64,
            totalFee: 17.89,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 2.89
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 707.5,
            originalPrice: 850,
            totalFee: 20,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
            feeStripe: 5
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
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 72.25,
            originalPrice: 85,
            totalFee: 15.58,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 0.58
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 361.79,
            originalPrice: 425.64,
            totalFee: 17.89,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 2.89
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 722.5,
            originalPrice: 850,
            totalFee: 20,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
            feeStripe: 5
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
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 56.67,
            originalPrice: 85,
            totalFee: 15.58,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 0.58
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 343.9,
            originalPrice: 425.64,
            totalFee: 17.89,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 2.89
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 702.5,
            originalPrice: 850,
            totalFee: 20,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
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
        originalPrice: 85,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 71.67,
            originalPrice: 85,
            totalFee: 15.58,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15,
            feeStripe: 0.58
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
        originalPrice: 425.64,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 358.9,
            originalPrice: 425.64,
            totalFee: 17.89,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 15,
            feeStripe: 2.89
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
        originalPrice: 850,
        stripePercent: 2.9,
        stripeFlat: 0.3,
        stripeAchPercent: 0.8,
        stripeAchFlat: 0,
        paidUpFee: 0,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: false
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 717.5,
            originalPrice: 850,
            totalFee: 20,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 15,
            feeStripe: 5
          }
          , data);
        done();
      });
    });

  }) // set 4




});

