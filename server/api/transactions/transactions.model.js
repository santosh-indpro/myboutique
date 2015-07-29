'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    userID: String,
    addressL1: String,
    addressL2: String,
    city: String,
    state: String,
    country: String,
    productsList: [],/* productID, quantity */
    totalCost: Number,
    orderDate: Date,
    orderStatus: Boolean,
    paymentStatus: Boolean,
    paymentDate: Date
});

module.exports = mongoose.model('Transaction', TransactionSchema);