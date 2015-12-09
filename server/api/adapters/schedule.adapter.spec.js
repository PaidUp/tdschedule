'use strict'

'use strict';

const app = require('../../app');
const should = require('should');
const assert = require('chai').assert;
const config = require('../../config/environment/index');
const commerceAdapterSchedule = require(config.commerce.adapter);
let result = {}
let resultmeta = {}
let resultschedule = {}

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

  it('update payment plan', function (done) {
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

describe("schedule adapter payment plan metadata", function() {
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

  it('update payment plan metadata', function (done) {
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

  // TODO Resource is not set
  it.skip('info payment plan metadata TODO', function(done){
    var param = {metadataId:resultmeta.paymentplanId};
    commerceAdapterSchedule.paymentPlanMetaDataInfo(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isObject(data)
      assert.equal('testName3', data.name);
      done();
    });
  });

  it('list payment plan metadata', function (done) {
    this.timeout(25000);
    var param = {paymentPlanId : resultmeta.paymentplanId};
    commerceAdapterSchedule.paymentPlanMetaDataList(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isArray(data)
      done();
    })
  })

  // TODO Resource is not set
  it.skip('delete payment plan metadata TODO', function(done){
      this.timeout(25000);
      var param = {metadataId:resultmeta.paymentplanId};
      commerceAdapterSchedule.paymentPlanMetaDataDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})

describe("schedule adapter payment plan schedule", function() {
  this.timeout(5000)

  it('create payment plan', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.paymentPlanCreate({name:'testNameschedule', destination:'destinationTestschedule'}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      result.paymentplanId=data;
      done();
    })
  })

  it('create payment plan schedule', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.scheduleCreate({paymentPlanId : result.paymentplanId,
    scheduleData:
    {
      name : 'String',
    }}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      resultschedule.scheduleId=data;
      done();
    })
  })

  it('update payment plan schedule', function (done) {
    var param = {
    scheduleId:resultschedule.scheduleId,
      scheduleData : {
        name : 'Schedule Description Mod'
      }
    }
    commerceAdapterSchedule.scheduleUpdate(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isTrue(data)
      done();
    });
  });

  it('info payment plan schedule', function(done){
    var param = {scheduleId:resultschedule.scheduleId};
    commerceAdapterSchedule.scheduleInfo(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isObject(data)
      assert.equal('Schedule Description Mod', data.name);
      done();
    });
  });

  it('list payment plan schedule', function (done) {
    this.timeout(25000);
    var param = {scheduleId : resultschedule.scheduleId};
    commerceAdapterSchedule.scheduleList(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isArray(data)
      done();
    })
  })

  // TODO Resource is not set
  it.skip('delete payment plan schedule TODO', function(done){
      this.timeout(25000);
      var param = {paymentPlanId:result.paymentplanId};
      commerceAdapterSchedule.scheduleDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})

describe("schedule adapter payment plan schedule information", function() {
  this.timeout(5000)

  it('create payment plan', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.paymentPlanCreate({name:'testNameschedule', destination:'destinationTestschedule'}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      result.paymentplanId=data;
      done();
    })
  })

  it('create payment plan schedule', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.scheduleCreate({paymentPlanId : result.paymentplanId,
    scheduleData:
    {
      name : 'String',
    }}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      resultschedule.scheduleInformationId=data;
      done();
    })
  })

  it('create payment plan schedule information', function (done) {
    this.timeout(25000);
    commerceAdapterSchedule.scheduleInformationCreate({
    scheduleId:resultschedule.scheduleInformationId,
    informationData:
    {
      name : 'StringName',
      value : 'Stringvalue',
    }
    }, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      resultschedule.scheduleInformationIddata=data;
      done();
    })
  })

  it('update payment plan schedule information', function (done) {
    var param = {
      scheduleId:resultschedule.scheduleInformationId,
      informationData:
      [{
        name : 'StringName',
        value : 'StringvalueUpdate',
      },{
        name : 'String2Name',
        value : 'String2Value',
      }]
    }
    commerceAdapterSchedule.scheduleInformationUpdate(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isTrue(data)
      done();
    });
  });

  it('list payment plan schedule information', function (done){
    var param = {scheduleId:resultschedule.scheduleId};
    commerceAdapterSchedule.scheduleInformationList(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isArray(data)
      done();
    });
  });

  it('info payment plan schedule information', function (done) {
    this.timeout(25000);
    var param = {informationId:resultschedule.scheduleInformationIddata};
    commerceAdapterSchedule.scheduleInformationInfo(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isObject(data)
      assert.equal('StringName', data.name);
      assert.equal('StringvalueUpdate', data.value);
      done();
    })
  })

  it('delete payment plan schedule information', function (done){
      this.timeout(25000);
      var param = {informationId:resultschedule.scheduleInformationId}
      commerceAdapterSchedule.scheduleInformationDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})