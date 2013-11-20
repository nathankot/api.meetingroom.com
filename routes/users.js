'use strict';

var User = require('../models/user.js');
var parseErrors = require('../lib/parse_errors.js');

exports.create = function(req, res) {
  new User({ email: req.body.user.email }).save(function(error, user) {
    if (error) {
      res.send(422, parseErrors(error));
    } else {
      res.send(201, user.toObject());
    }
  });
};
