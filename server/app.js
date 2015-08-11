/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var uploadPath;
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var path = require('path');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
uploadPath = __dirname + "/uploads/";
app.use(express.static(__dirname + '/uploads'));


var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);



// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

//For image upload exposing the endpoints
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.post('/images', multipartMiddleware, function(req, resp) {

	var productImageController = require('./api/productImage/productImage.controller');// don't forget to delete all req.files when done
	productImageController.create(req, resp, uploadPath);
});
// Expose app
exports = module.exports = app;
