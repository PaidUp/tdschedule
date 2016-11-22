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
  describe.skip("TEST SET #1 - % PAIDUP FEE, NO DISCOUNT", function () {
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

  describe.skip("TEST SET #2 - % PAIDUP FEE, 15% DISCOUNT", function () {
    it('Row #2.1', function (done) {
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

    it('Row #2.2', function (done) {
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

    it('Row #2.3', function (done) {
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

    it('Row #2.4', function (done) {
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

    it('Row #2.5', function (done) {
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

    it('Row #2.6', function (done) {
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

    it('Row #2.7', function (done) {
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

    it('Row #2.8', function (done) {
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

    it('Row #2.9', function (done) {
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

    it('Row #2.10', function (done) {
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

    it('Row #2.11', function (done) {
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

    it('Row #2.12', function (done) {
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

    it('Row #2.13', function (done) {
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

    it('Row #2.14', function (done) {
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

    it('Row #2.15', function (done) {
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

    it('Row #2.16', function (done) {
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

    it('Row #2.17', function (done) {
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

    it('Row #2.18', function (done) {
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

    it('Row #2.19', function (done) {
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

    it('Row #2.20', function (done) {
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

    it('Row #2.21', function (done) {
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

    it('Row #2.22', function (done) {
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

    it('Row #2.23', function (done) {
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

    it('Row #2.24', function (done) {
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

  describe.skip("TEST SET #3 - FLAT PAIDUP FEE, NO DISCOUNT", function () {
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
        originalPrice: 85,
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

    it.skip('Row #4.2', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.3', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.4', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.5', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.6', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.7', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.8', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.9', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.10', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.11', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.12', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.13', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.14', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.15', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.16', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.17', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.18', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.19', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.20', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.21', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.22', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.23', function (done) {
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
        paidUpFlat: 75,
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

    it.skip('Row #4.24', function (done) {
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
        paidUpFlat: 75,
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

  describe.skip("TEST SET #5 - % PAIDUP FEE & FLAT PAIDUP FEE, NO DISCOUNT", function () {
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 84.16,
            originalPrice: 100,
            totalFee: 19.04,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15.84,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 480.94,
            originalPrice: 500.75,
            totalFee: 34.63,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 19.81,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 975.25,
            originalPrice: 1000,
            totalFee: 54.05,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 24.75,
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
        paidUpFee: 1,
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
            totalFee: 19.2,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 16,
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
        paidUpFee: 1,
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
            totalFee: 34.83,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 20.01,
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
        paidUpFee: 1,
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
            totalFee: 54.3,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 25,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 80.99,
            originalPrice: 100,
            totalFee: 19.01,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15.81,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 466.27,
            originalPrice: 500.75,
            totalFee: 34.48,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 19.66,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 946.24,
            originalPrice: 1000,
            totalFee: 53.76,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 24.46,
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
        paidUpFee: 1,
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
            totalFee: 19.17,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15.97,
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
        paidUpFee: 1,
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
            totalFee: 34.68,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 19.86,
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
        paidUpFee: 1,
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
            totalFee: 54.01,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 24.71,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 84.16,
            originalPrice: 100,
            totalFee: 16.64,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15.84,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 480.94,
            originalPrice: 500.75,
            totalFee: 23.82,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 19.81,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 975.25,
            originalPrice: 1000,
            totalFee: 29.75,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 24.75,
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
        paidUpFee: 1,
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
            totalFee: 16.8,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 16,
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
        paidUpFee: 1,
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
            totalFee: 24.02,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 20.01,
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
        paidUpFee: 1,
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
            totalFee: 30,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 25,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 83.37,
            originalPrice: 100,
            totalFee: 16.63,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15.83,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 476.97,
            originalPrice: 500.75,
            totalFee: 23.78,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 19.77,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 0,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(

          {
            version: 'v2',
            basePrice: 970.3,
            originalPrice: 1000,
            totalFee: 29.7,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 24.7,
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
        paidUpFee: 1,
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
            totalFee: 16.79,
            owedPrice: 100,
            discount: 0,
            feePaidUp: 15.99,
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
        paidUpFee: 1,
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
            totalFee: 23.98,
            owedPrice: 500.75,
            discount: 0,
            feePaidUp: 19.97,
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
        paidUpFee: 1,
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
            totalFee: 29.95,
            owedPrice: 1000,
            discount: 0,
            feePaidUp: 24.95,
            feeStripe: 5
          }
          , data);
        done();
      });
    });
  }) // set 5

  describe.skip("TEST SET #6 - % PAIDUP FEE & FLAT PAIDUP FEE, 15% DISCOUNT", function () {
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 56.68,
            originalPrice: 85,
            totalFee: 17.97,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.57,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 343.36,
            originalPrice: 425.64,
            totalFee: 29.22,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.43,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 700.5,
            originalPrice: 850,
            totalFee: 43.26,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 22.01,
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
        paidUpFee: 1,
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
            totalFee: 18.12,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.72,
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
        paidUpFee: 1,
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
            totalFee: 29.41,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.62,
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
        paidUpFee: 1,
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
            totalFee: 43.48,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 22.23,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 54.31,
            originalPrice: 85,
            totalFee: 17.94,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.54,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 332.67,
            originalPrice: 425.64,
            totalFee: 29.12,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.33,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 679.45,
            originalPrice: 850,
            totalFee: 43.04,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 21.79,
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
        paidUpFee: 1,
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
            totalFee: 18.1,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.7,
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
        paidUpFee: 1,
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
            totalFee: 29.3,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.51,
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
        paidUpFee: 1,
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
            totalFee: 43.26,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 22.01,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 56.68,
            originalPrice: 85,
            totalFee: 16.15,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.57,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 343.36,
            originalPrice: 425.64,
            totalFee: 21.32,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.43,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: false,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 700.5,
            originalPrice: 850,
            totalFee: 27.01,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 22.01,
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
        paidUpFee: 1,
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
            totalFee: 16.3,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.72,
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
        paidUpFee: 1,
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
            totalFee: 21.51,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.62,
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
        paidUpFee: 1,
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
            totalFee: 27.23,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 22.23,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 56.11,
            originalPrice: 85,
            totalFee: 16.14,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.56,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 340.49,
            originalPrice: 425.64,
            totalFee: 21.29,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.4,
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
        paidUpFee: 1,
        paidUpFlat: 15,
        discount: 15,
        payProcessing: true,
        payCollecting: true
      }, function (err, data) {
        assert.deepEqual(
          {
            version: 'v2',
            basePrice: 695.54,
            originalPrice: 850,
            totalFee: 26.96,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 21.96,
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
        paidUpFee: 1,
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
            totalFee: 16.3,
            owedPrice: 72.25,
            discount: 12.75,
            feePaidUp: 15.72,
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
        paidUpFee: 1,
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
            totalFee: 21.48,
            owedPrice: 361.79,
            discount: 63.85,
            feePaidUp: 18.59,
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
        paidUpFee: 1,
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
            totalFee: 27.18,
            owedPrice: 722.5,
            discount: 127.5,
            feePaidUp: 22.18,
            feeStripe: 5
          }
          , data);
        done();
      });
    });
  }) // set 6



});

