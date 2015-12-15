'use strict'

const app = require('../../app')
const should = require('should')
const assert = require('chai').assert
const config = require('../../config/environment/index')
var request = require('supertest');
let wagner = require('wagner-core')
let result = {}
var tokenTDSchedule = 'TDScheduleToken-CHANGE-ME!';

describe("schedule controller payment plan", function() {
	this.timeout(6000)
  before('login', function (done){
    setTimeout(function(){
      require(config.commerce.adapter)(wagner).login()  
      done()
    }, 5000)
  })

  it('create payment plan controller', function (done) {
    this.timeout(25000);
    request(app)
    .post('/api/v2/paymentplan/create')
    .send({name:'testName', destination:'destinationTest'})
    // .set('Authorization', tokenTDUser)
    .expect(200)
    .end(function(err, res) {
    	result.paymentPlanId = res.body.paymentPlanId
      assert.isNull(err)
      assert.isNotNull(res.body)
      assert.isObject(res.body)
      done()
    })
  })

  it('update payment plan controller', function (done) {
  	this.timeout(25000);
    request(app)
    .put('/api/v2/paymentplan/update')
    .send({paymentPlanId:result.paymentPlanId,
        playmentPlanData: {name:'testNameUpd',
        destination:'destinationTestUpd'}})
    // .set('Authorization', tokenTDUser)
    .expect(200)
    .end(function(err, res) {
      assert.isNull(err)
      assert.isNotNull(res.body)
      assert.isObject(res.body)
      assert.isTrue(res.body.updated)
      done()
    })
  })

  it('info payment plans controller', function(done){
  	this.timeout(25000);
    request(app)
    .get('/api/v2/paymentplan/info/'+result.paymentPlanId)
    // .set('Authorization', tokenTDUser)
    .expect(200)
    .end(function(err, res) {
      assert.isNull(err)
      assert.isObject(res.body)
      assert.equal('testNameUpd', res.body.name);
      done()
    })
  })

  it('list payment plan controller', function (done) {
    this.timeout(25000);
    request(app)
    .post('/api/v2/paymentplan/list')
    .send({filter:'filter'})
    // .set('Authorization', tokenTDUser)
    .expect(200)
    .end(function(err, res) {
      assert.isNull(err)
      assert.isNotNull(res.body)
      assert.isArray(res.body)
      done()
    });
  })

  it('delete payment plans controller', function(done){
    this.timeout(25000);
    request(app)
    .delete('/api/v2/paymentplan/delete/' + result.paymentPlanId)
    // .set('Authorization', tokenTDUser)
    .expect(200)
    .end(function(err, res) {
      assert.isNull(err)
      assert.isNotNull(res.body)
      assert.isTrue(res.body.deleted)
      done()
    });
  })

  it('createFull payment plan controller', function (done) {
  	var data = {
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
    this.timeout(25000);
    request(app)
    .post('/api/v2/paymentplan/create/full')
    .send(data)
    // .set('Authorization', tokenTDUser)
    .expect(200)
    .end(function(err, res) {
    	result.paymentPlanFullId = res.body.paymentPlanId
      assert.isNull(err)
      assert.isNotNull(res.body)
      assert.isObject(res.body)
      done()
    })
  })

  it('info payment plans controller', function(done){
  	this.timeout(25000);
    request(app)
    .get('/api/v2/paymentplan/info/full/'+result.paymentPlanFullId)
    // .set('Authorization', tokenTDUser)
    .expect(200)
    .end(function(err, res) {
      assert.isNull(err)
      assert.isObject(res.body)
      assert.equal('testNameFull', res.body.name);
      done()
    })
  })

})
