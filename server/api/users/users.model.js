'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  mobile: String,
  fullname: String,
  active: Boolean
});

module.exports = mongoose.model('User', UserSchema);