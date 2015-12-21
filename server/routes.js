'use strict';

module.exports = function(app, wagner) {

  // Insert routes below
  app.use('/api/v2', require('./api')(wagner))

  app.route('/*')
    .get(function(req, res) {
      res.status(200).json({'TD':'Schedule!!!'});
    });
};
