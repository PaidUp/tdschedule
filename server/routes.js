'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/v1', require('./api'))

  app.route('/*')
    .get(function(req, res) {
      res.status(200).json({'TD':'Schedule!!!'});
    });
};
