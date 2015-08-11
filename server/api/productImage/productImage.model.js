'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productImage = new Schema({
    id: String,
    image: Buffer
});

module.exports = mongoose.model('productImage', productImage);