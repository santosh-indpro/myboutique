'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemPosted = new Schema({
    name: String,
    description: String,
    price: Number,
    images : [],
    phone: String,
    location: String,
    email:String
});

module.exports = mongoose.model('Item', ItemPosted);