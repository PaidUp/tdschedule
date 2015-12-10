'use strict'

var config = require('../../config/environment');
var MagentoAPI = require('magento');
var magento = new MagentoAPI(config.commerce.magento);
var camelize = require('camelize');
// const snakeize = require('snakeize');
// const logger = require('../../config/logger.js');
var wagner = require('wagner-core')

module.exports = function () {
  function login () {
    wagner.task('magento', function(callback){
      if(magento.sessId){
        return callback(null,magento)
      }else{
        magento.login(function(err, sessId) {
          magento.sessId = sessId
          if(err) return callback(err);
          return callback(null,magento);
        });
      }
    })
  }

  // payment plan
  /* create
    param = 
    {
      paymentPlanData:
      {
        name:'String',
        destination:'String'
      }
    }
  */
  function paymentPlanCreate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplan.create({
        paymentPlanData: param
      }, function (err, resPaymentPLan) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLan));
      });
    });
  }

  /* update
  param = 
    {
      paymentPlanId:'String',
      playmentPlanData: 
      {
        name:'String',
        destination:'String'
      }
    }
  */
  function paymentPlanUpdate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplan.update(param, function (err, resPaymentPLan) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLan));
      });
    });
  }

  /* info
    param =
    {
      paymentPlanId:'String'
    }
  */
  function paymentPlanInfo(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplan.info(param, function (err, resPaymentPLan) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLan));
      });
    });
  }

  /* list
    param = {}
  */
  function paymentPlanList(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplan.list(param, function (err, resPaymentPLan) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLan));
      });
    });
  }

  /* delete
    param =
    {
      paymentPlanId:'String'
    }
  */
  function paymentPlanDelete(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplan.delete(param, function (err, resPaymentPLan) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLan));
      });
    });
  }

  // payment plan metadata
  /* create
    param =
    {
      paymentPlanId : 'String',
      metadataData:
      {
        name : 'String',
        value : 'String',
      }
    }
  */
  function paymentPlanMetaDataCreate(param, res) {
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanMetadata.create(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* update
    param =
    {
      paymentPlanId:'String',
      metadataData:
      [
        {
          name : 'String',
          value : 'String'
        }
      ]
    }
  */
  function paymentPlanMetaDataUpdate(param, res) {
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanMetadata.update(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* list
    param =
    {
      paymentPlanId: 'String'
    }
  */
  function paymentPlanMetaDataList(param, res) {
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanMetadata.list(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* info
    param = 
    {
      metadataId:'String'
    }
  */
  function paymentPlanMetaDataInfo(param, res) {
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanMetadata.info(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* delete
    param = 
    {
      metadataId:'String'
    }
  */
  function paymentPlanMetaDataDelete(param, res) {
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanMetadata.delete(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }
  // payment plan metadata

  // payment plan schedule
  /* create
    param =
    {
      paymentPlanId : 'String',
      scheduleData:
      {
        name : 'String',
      }
    }
  */
  function scheduleCreate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanSchedule.create(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* update
    param =
    {
      scheduleId: 'String',
      scheduleData:
      {
        name : 'String'
      }
    }
  */
  function scheduleUpdate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanSchedule.update(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* list
    param =
    {
      scheduleId : 'String'
    }
  */
  function scheduleList(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanSchedule.list(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* info
    param =
    {
      scheduleId:'String'
    }
  */
  function scheduleInfo(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanSchedule.info(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* delete
    {
      paymentPlanId: 'String',
      names : ['String']
    }
  */
  function scheduleDelete(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanSchedule.delete(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }
  // payment plan schedule

  // payment plan schedule information
  /* create
    param =
    {
      scheduleId:'String',
      informationData:
      {
        name : 'String',
        value : 'String',
      }
    }
  */
  function scheduleInformationCreate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanScheduleInformation.create(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* update
    param =
    {
      scheduleId:'String',
      informationData:
      [{
        name : 'StringName',
        value : 'Stringvalue',
      },{
        name : 'String2Name',
        value : 'String2Value',
      }]
    }
  */
  function scheduleInformationUpdate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanScheduleInformation.update(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* list
    param =
    {
      scheduleId : 'String'
    }
  */
  function scheduleInformationList(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanScheduleInformation.list(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* info
    param =
    {
      informationId: 'String'
    }
  */
  function scheduleInformationInfo(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanScheduleInformation.info(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* delete
    {
      informationId: 'String'
    }
  */
  function scheduleInformationDelete(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentplanScheduleInformation.delete(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }
  // payment plan schedule information

  // payment plan retry
  /* create
    param =
    {
      paymentRetryData : {
        name : 'String',
        increment_id : '100000001'
      }
    }
  */
  function paymentPlanRetryCreate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentRetry.create(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* update
    param =
    {
      paymentRetryId : 'String',
      paymentRetryData : {
        name : 'String',
        increment_id : '100000261'
      }
    }
  */
  function paymentPlanRetryUpdate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentRetry.update(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* list
    param =
    {
      paymentRetryId : "String"
    }
  */
  function paymentPlanRetryList(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentRetry.list(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* info
    param =
    {
      paymentRetryId : 'String'
    }
  */
  function paymentPlanRetryInfo(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippoPaymentRetry.info(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }
  // payment plan retry

  // payment plan retry information
  /* create
    param =
    {
      paymentRetryId : 'String',
      informationData : {
        name : 'informationDataField',
        value : 'informationDataValue'
      }
    }
  */
  function paymentPlanRetryInformationCreate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippopaymentretryInformation.create(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* update
    {
      paymentRetryId : 'String',
      informationData : [{
        name : 'String',
        value : 'String'
      },{
        name : 'StringTwo',
        value : 'StringTwo'
      }]
    }
  */
  function paymentPlanRetryInformationUpdate(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippopaymentretryInformation.update(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  } 

  /* list
    param =
    {
      paymentretryId : 'String'
    }
  */
  function paymentPlanRetryInformationList(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippopaymentretryInformation.list(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

  /* info
    param =
    {
      informationId : 'String'
    }
  */
  function paymentPlanRetryInformationInfo(param, res){
    wagner.invokeAsync(function(error, magento) {
      magento.bighippopaymentretryInformation.info(param, function (err, resPaymentPLanMetadata) {
        if(err) return res(err);
        return res(null,camelize(resPaymentPLanMetadata));
      });
    });
  }

/* delete
  param =
  {
    informationId : 'String'
  }
*/
function paymentPlanRetryInformationDelete(param, res){
  wagner.invokeAsync(function(error, magento) {
    magento.bighippopaymentretryInformation.delete(param, function (err, resPaymentPLanMetadata) {
      if(err) return res(err);
      return res(null,camelize(resPaymentPLanMetadata));
    });
  });
}
// payment plan retry information

return {
    login: login,
    paymentPlanCreate: paymentPlanCreate,
    paymentPlanUpdate: paymentPlanUpdate,
    paymentPlanInfo: paymentPlanInfo,
    paymentPlanList: paymentPlanList,
    paymentPlanDelete: paymentPlanDelete,
    paymentPlanMetaDataCreate: paymentPlanMetaDataCreate,
    paymentPlanMetaDataUpdate: paymentPlanMetaDataUpdate,
    paymentPlanMetaDataList: paymentPlanMetaDataList,
    paymentPlanMetaDataInfo: paymentPlanMetaDataInfo,
    paymentPlanMetaDataDelete: paymentPlanMetaDataDelete,
    scheduleCreate: scheduleCreate,
    scheduleUpdate: scheduleUpdate,
    scheduleList: scheduleList,
    scheduleInfo: scheduleInfo,
    scheduleDelete: scheduleDelete,
    scheduleInformationCreate: scheduleInformationCreate,
    scheduleInformationUpdate: scheduleInformationUpdate,
    scheduleInformationList: scheduleInformationList,
    scheduleInformationInfo: scheduleInformationInfo,
    scheduleInformationDelete: scheduleInformationDelete,
    paymentPlanRetryCreate: paymentPlanRetryCreate,
    paymentPlanRetryUpdate: paymentPlanRetryUpdate,
    paymentPlanRetryList: paymentPlanRetryList,
    paymentPlanRetryInfo: paymentPlanRetryInfo,
    paymentPlanRetryInformationCreate: paymentPlanRetryInformationCreate,
    paymentPlanRetryInformationUpdate: paymentPlanRetryInformationUpdate,
    paymentPlanRetryInformationList: paymentPlanRetryInformationList,
    paymentPlanRetryInformationInfo: paymentPlanRetryInformationInfo,
    paymentPlanRetryInformationDelete: paymentPlanRetryInformationDelete
  }
}