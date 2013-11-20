'use strict';

var mongoose = require('mongoose');
var connection;

module.exports = (function() {
  if (connection) { return connection; }

  mongoose.connect(process.env.MONGO_URL || process.env.MONGOHQ_URL);
  mongoose.connection.on('connect', function () {
    console.log('Connected to DB');
  }).on('error', console.error.bind(console, 'connection error:'));

  connection = mongoose.connection;
  return connection;
})();
