'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  mobile: String,
  password: String,
  email: String,
  fullname: String,
  active: Boolean
});

module.exports = mongoose.model('User', UserSchema);