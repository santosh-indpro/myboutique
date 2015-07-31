'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MycartSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Mycart', MycartSchema);