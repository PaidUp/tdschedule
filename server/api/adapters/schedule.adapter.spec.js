'use strict'

var app = require('../../app')
var should = require('should')
var assert = require('chai').assert
var config = require('../../config/environment/index')
var wagner = require('wagner-core')
var commerceAdapterSchedule = require(config.commerce.adapter)(wagner)
var result = {}
var resultmeta = {}
var resultschedule = {}
var resultretry = {}





describe("schedule adapter payment plan", function() {
  this.timeout(30000)

  before('login', function (done){
    setTimeout(function(){
      require(config.commerce.adapter)(wagner).login()
      done()
    }, 5000)
  })


  it('create payment plan', function (done) {
    this.timeout(30000)
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
    this.timeout(30000)
  	var param = {paymentPlanId:result.paymentplanId,
        paymentPlanData: {name:'testName3',
        destination:'destinationTest3'}};
	  commerceAdapterSchedule.paymentPlanUpdate(param, function(err,data){
	  	if(err) return done(err);
	    assert.isNull(err)
	    assert.isTrue(data)
	    done();
	  });
  })

  it('info payment plans', function (done){
    this.timeout(30000)
    var param = {paymentPlanId:result.paymentplanId};
    commerceAdapterSchedule.paymentPlanInfo(param, function(err,data){
    	if(err) return done(err);
      assert.isNull(err)
      assert.isObject(data)
      assert.equal('testName3', data.name);
      done();
    });
  })

  it('list payment plan', function (done) {
    this.timeout(30000)
    commerceAdapterSchedule.paymentPlanList({}, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isArray(data)
      done();
    })
  })

  it('delete payment plans', function (done){
    this.timeout(30000)
      var param = {paymentPlanId:result.paymentplanId};
      commerceAdapterSchedule.paymentPlanDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  })

  it('createFull payment plan', function (done) {
    this.timeout(30000)
    var param = {
    name:'testNameFull', destination:'destinationTestFull',
    'metadatas' : [
      {name : 'metaName1' , value : 'metaValue1'} , {name : 'metaName2' , value : 'metaValue2'}],
    'schedules' : {
      schedule_data : {name :'schedule full test',
        informations : [
          {name : 'scheduleName1' , value : 'scheduleValue1'},
          {name : 'scheduleName2' , value : 'scheduleValue2'}
        ]
      },
    }}
    commerceAdapterSchedule.paymentPlanCreateFull(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      result.paymentplanFullId=data;
      done();
    })
  })

  it('infoFull payment plans', function(done){
    this.timeout(30000)
    var param = {paymentPlanId:result.paymentplanFullId};
    commerceAdapterSchedule.paymentPlanInfo(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isObject(data)
      assert.equal('testNameFull', data.name);
      done();
    });
  })

})

describe("schedule adapter payment plan metadata", function() {
  this.timeout(30000)
  it('create payment plan', function (done) {
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
      var param = {metadataId:resultmeta.paymentplanId};
      commerceAdapterSchedule.paymentPlanMetaDataDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})

describe("schedule adapter payment plan schedule", function() {
  this.timeout(30000)
  it('create payment plan', function (done) {
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
      var param = {paymentPlanId:result.paymentplanId};
      commerceAdapterSchedule.scheduleDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})

describe("schedule adapter payment plan schedule information", function() {
  this.timeout(30000)
  it('create payment plan', function (done) {
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
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
    this.timeout(30000)
    var param = {scheduleId:resultschedule.scheduleId};
    commerceAdapterSchedule.scheduleInformationList(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isArray(data)
      done();
    });
  });

  it('info payment plan schedule information', function (done) {
    this.timeout(30000)
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
    this.timeout(30000)
      var param = {informationId:resultschedule.scheduleInformationId}
      commerceAdapterSchedule.scheduleInformationDelete(param, function(err,data){
        assert.isNull(err)
        assert.isTrue(data)
        done();
      });
  });

})

describe("schedule adapter payment retry", function() {
  this.timeout(30000)
  it('create payment plan retry', function (done) {
    commerceAdapterSchedule.paymentPlanRetryCreate({
        paymentRetryData : {
          name : 'name retry',
          increment_id : '100000261'
        }
      }, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      resultretry.retryId=data;
      done();
    })
  })

  it('update payment plan retry', function (done) {
    this.timeout(30000)
    var param = {
      paymentRetryId : resultretry.retryId,
      paymentRetryData : {
        name : 'name retry upd',
        increment_id : '100000261'
      }
    }
    commerceAdapterSchedule.paymentPlanRetryUpdate(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isTrue(data)
      done();
    });
  });

  it('list payment plan retry', function (done){
    this.timeout(30000)
    var param = {paymentRetryId : resultretry.retryId};
    commerceAdapterSchedule.paymentPlanRetryList(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isArray(data)
      done();
    });
  });

  it('info payment plan retry', function (done) {
    this.timeout(30000)
    var param = {
      paymentRetryId : resultretry.retryId
    };
    commerceAdapterSchedule.paymentPlanRetryInfo(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isObject(data)
      assert.equal('name retry upd', data.name);
      assert.equal('100000261', data.incrementId);
      done();
    })
  })

})

describe("schedule adapter payment retry information", function() {
  this.timeout(30000)
  it('create payment plan retry', function (done) {
    this.timeout(30000)
    commerceAdapterSchedule.paymentPlanRetryCreate({
        paymentRetryData : {
          name : 'name retry',
          increment_id : '100000261'
        }
      }, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      resultretry.retryId=data;
      done();
    })
  })

  it('create payment plan retry information', function (done) {
    this.timeout(30000)
    commerceAdapterSchedule.paymentPlanRetryInformationCreate({
        paymentRetryId : resultretry.retryId,
        informationData : {
          name : 'informationDataField',
          value : 'informationDataValue'
        }
      }, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isString(data)
      assert.isNotNull(data);
      resultretry.retryinformationId=data;
      done();
    })
  })

  it('update payment plan retry information', function (done) {
    this.timeout(30000)
    var param = {
        paymentRetryId : resultretry.retryId,
        informationData : [{
          name : 'informationDataField',
          value : 'informationDataValueUpd'
        },{
          name : 'informationDataFieldNew',
          value : 'informationDataValueNew'
        }]
      }
    commerceAdapterSchedule.paymentPlanRetryInformationUpdate(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isTrue(data)
      done();
    });
  });

  it('list payment plan retry information', function (done){
    this.timeout(30000)
    var param = {paymentretryId : resultretry.retryId};
    commerceAdapterSchedule.paymentPlanRetryInformationList(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isArray(data)
      done();
    });
  });

  it('info payment plan retry information', function (done) {
    this.timeout(30000)
    var param = {
      informationId : resultretry.retryinformationId
    };
    commerceAdapterSchedule.paymentPlanRetryInformationInfo(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data);
      assert.isObject(data)
      assert.equal('informationDataField', data.name);
      assert.equal('informationDataValueUpd', data.value);
      done();
    })
  })

  it('delete payment plan retry information', function (done) {
    this.timeout(30000)
    var param = {
      informationId : resultretry.retryinformationId
    };
    commerceAdapterSchedule.paymentPlanRetryInformationDelete(param, function(err,data){
      if(err) return done(err);
      assert.isNull(err)
      assert.isNotNull(data)
      assert.isTrue(data)
      done();
    })
  })

})