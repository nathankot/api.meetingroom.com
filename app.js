'use strict';

/**
 * Module dependencies.
 */

require('newrelic');
require('./lib/connection.js');

var express = require('express');
var routes = require('./routes');
var http = require('http');
var cors = require('cors');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.options('*', cors());
app.post('/users', routes.users.create);
app.get('/ping', function(req, res) {
  res.send(200);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
