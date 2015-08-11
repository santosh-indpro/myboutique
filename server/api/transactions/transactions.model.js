'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    userID: String,
    addressL1: String,
    addressL2: String,
    city: String,
    state: String,
    dealDesc: String,
    productsList: []
});

module.exports = mongoose.model('Transaction', TransactionSchema);