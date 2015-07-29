'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    userID: String,
    name: String,
    description: String,
    price: Number,
    images : [],
    location: String,
    email:String,
    datecreated: Date,
    publishStatus: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);