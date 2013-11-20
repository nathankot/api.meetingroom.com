/*jshint globalstrict: true*/
/*global require*/

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  browser: { type: String },
  ip: { type: String },
  location: { type: String }
});


var User = module.exports = mongoose.model('User', userSchema);

// Validations

User.schema.path('email').validate(function(value, respond) {
  User.findOne({ email: value }, function(err, user) {
    if (user) { respond(false); }
    else { respond(true); }
  });
}, 'Email is already registered with us.');

// Options

User.schema.options.toObject = {
  transform: function(doc, ret) {
    delete ret.browser;
    delete ret.ip;
    delete ret.location;
  }
};

