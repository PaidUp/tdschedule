'use strict'

'use strict';

const app = require('../../app');
const should = require('should');
const assert = require('chai').assert;
const config = require('../../config/environment/index');
const commerceAdapterSchedule = require(config.commerce.adapter);
let result = {}
let resultmeta = {}

describe("schedule adapter payment plan", function() {
  this.timeout(5000)

  it('create payment plan', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.paymentPlanCreate({name:'testName', destination:'destinationTest'}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      result.paymentplanId=data;
      done();
    })
  })

  it('update payment plans', function (done) {
  	var param = {paymentPlanId:result.paymentplanId,
        playmentPlanData: {name:'testName3',
        destination:'destinationTest3'}};
	  commerceAdapterSchedule.paymentPlanUpdate(param, function(err,data){
	  	if(err) return done(err);
	    assert.isNull(err)
	    assert.isTrue(data)
	    done();
	  });
  });

  it('info payment plans', function(done){
    var param = {paymentPlanId:result.paymentplanId};
    commerceAdapterSchedule.paymentPlanInfo(param, function(err,data){
    	if(err) return done(err);
      assert.isNull(err)
      assert.isObject(data)
      assert.equal('testName3', data.name);
      done();
    });
  });

  it('list payment plan', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.paymentPlanList({}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isArray(data)
      done();
    })
  })

  it('delete payment plans', function(done){
      this.timeout(25000);
      var param = {paymentPlanId:result.paymentplanId};
      commerceAdapterSchedule.paymentPlanDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})

describe.only("schedule adapter payment plan metadata", function() {
  this.timeout(5000)

  it('create payment plan', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.paymentPlanCreate({name:'testNamemeta', destination:'destinationTestmeta'}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      result.paymentplanId=data;
      done();
    })
  })

  it('create payment plan metadata', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.paymentPlanMetaDataCreate({paymentPlanId : result.paymentplanId,
    metadataData:
    {
      name : 'metadataDataName',
      value : 'metadataDataValue',
    }}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      resultmeta.paymentplanId=data;
      done();
    })
  })

  it('update payment plans', function (done) {
    var param = {
    paymentPlanId:result.paymentplanId,
    metadataData:
      [
        {
          name : 'metadataDataName',
          value : 'metadataDataValueUpdate'
        }
      ]
    };
    commerceAdapterSchedule.paymentPlanMetaDataUpdate(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isTrue(data)
      done();
    });
  });

  it.skip('info payment plans', function(done){
    var param = {paymentPlanId:result.paymentplanId};
    commerceAdapterSchedule.paymentPlanMetaDataInfo(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isObject(data)
      assert.equal('testName3', data.name);
      done();
    });
  });

  it.skip('list payment plan', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.paymentPlanMetaDataList({}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isArray(data)
      done();
    })
  })

  it.skip('delete payment plans', function(done){
      this.timeout(25000);
      var param = {paymentPlanId:result.paymentplanId};
      commerceAdapterSchedule.paymentPlanMetaDataDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})