'use strict'

var config = require('../../config/environment');
var MagentoAPI = require('magento');
var magento = new MagentoAPI(config.commerce.magento);
var camelize = require('camelize');
// const snakeize = require('snakeize');
// const logger = require('../../config/logger.js');

var login = exports.login = function(cb) {
  magento.core.info(function(err, data) {
    if(err) {
      magento.login(function(err, sessId) {
        if(err) return cb(err);
        return cb(null, sessId);
      });
    }
    else {
      return cb(null, true);
    }
  });
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
exports.paymentPlanCreate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanUpdate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
    // param = {paymentPlanId:resulst.paymentplanId, playmentPlanData: {name:'testName3', destination:'destinationTest3'}};
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
exports.paymentPlanInfo = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
    magento.bighippoPaymentplan.info(param, function (err, resPaymentPLan) {
      if(err) return res(err);
      return res(null,camelize(resPaymentPLan));
    });
  });
}

/* list
  param = {}
*/
exports.paymentPlanList = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanDelete = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanMetaDataCreate = function (param, res) {
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanMetaDataUpdate = function (param, res) {
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanMetaDataList = function (param, res) {
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanMetaDataInfo = function (param, res) {
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanMetaDataDelete = function (param, res) {
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleCreate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleUpdate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleList = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleInfo = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleDelete = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleInformationCreate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleInformationUpdate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleInformationList = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleInformationInfo = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.scheduleInformationDelete = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryCreate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryUpdate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryList = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryInfo = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryInformationCreate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryInformationUpdate = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryInformationList = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryInformationInfo = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
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
exports.paymentPlanRetryInformationDelete = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
    magento.bighippopaymentretryInformation.delete(param, function (err, resPaymentPLanMetadata) {
      if(err) return res(err);
      return res(null,camelize(resPaymentPLanMetadata));
    });
  });
}
// payment plan retry information

// coupon (Move to TDCOmmerce)
/* list
*/
exports.couponList = function(res){
  login(function(err) {
    if (err) {
      return res(err);
    }
    magento.bighippoCoupon.list(function (err, resPaymentPLanMetadata) {
      if(err) return res(err);
      return res(null,camelize(resPaymentPLanMetadata));
    });
  });
}

/* info
  param =
  {
    salesRuleId:'String'
  }
*/
exports.couponInfo = function(param, res){
  login(function(err) {
    if (err) {
      return res(err);
    }
    magento.bighippoCoupon.info(param, function (err, resPaymentPLanMetadata) {
      if(err) return res(err);
      return res(null,camelize(resPaymentPLanMetadata));
    });
  });
}
// coupon (Move to TDCOmmerce)
