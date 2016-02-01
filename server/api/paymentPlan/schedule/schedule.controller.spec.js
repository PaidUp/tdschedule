'use strict'

const app = require('../../../app')
const should = require('should')
const assert = require('chai').assert
const config = require('../../../config/environment/index')
var request = require('supertest');
let wagner = require('wagner-core')
let result = {}
var tokenTDSchedule = 'tdschedule-secret';

describe("schedule controller", function() {
	this.timeout(7000)
  before('login', function (done){
    setTimeout(function(){
      require(config.commerce.adapter)(wagner).login()  
      done()
    }, 6000)
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
    .set('Authorization', tokenTDSchedule)
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
    .set('Authorization', tokenTDSchedule)
    .expect(200)
    .end(function(err, res) {
      assert.isNull(err)
      assert.isObject(res.body)
      assert.equal('testNameFull', res.body.name);
          result.paymentPlanFull = res.body
      done()
    })
  })

  it('update schedule', function(done){
    this.timeout(25000);

    let param = {
      scheduleId:result.paymentPlanFull.schedules[0].entityId,
      informationData:
          [{
            name : 'StringName',
            value : 'StringvalueUpdate',
          },{
            name : 'String2Name',
            value : 'String2Value',
          }]
    }

    request(app)
        .put('/api/v2/paymentplan/schedule/information/update')
        .set('Authorization', tokenTDSchedule)
        .send(param)
        .expect(200)
        .end(function(err, res) {
          assert.isNull(err)
          assert.isTrue(res.body)
          result.paymentPlanFull = res.body

          request(app)
              .get('/api/v2/paymentplan/info/full/'+result.paymentPlanFullId)
              .set('Authorization', tokenTDSchedule)
              .expect(200)
              .end(function(err, res) {
                assert.isNull(err)
                assert.isObject(res.body)
                assert.equal('testNameFull', res.body.name);
                result.paymentPlanFull = res.body
                console.log(JSON.stringify(result.paymentPlanFull))
                done()
              })
        })
  })

})
