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
// payment plan schedule


// payment plan schedule information

// schedule
exports.scheduleCreate = function(param, res){
  return res(null, true)
}


