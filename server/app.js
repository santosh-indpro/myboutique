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

/* Start: Captcha */
var bodyParser = require( 'body-parser' ),
    sessions = require( 'client-sessions' ),
    _getAudio,
    _getImage,
    _startRoute,
    _trySubmission;

// Set session information
app.use( sessions({
    cookieName: 'session',
    secret: 'someRandomSecret!',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}) );

// Enable CORS
app.use( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
} );

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended: false }) );
// parse application/json
app.use( bodyParser.json() );

// Set public path
app.use( express.static( __dirname + '/public' ) );

// Define routes functions
// Fetches and streams an audio file
_getAudio = function( req, res, next ) {
    var visualCaptcha;

    // Default file type is mp3, but we need to support ogg as well
    if ( req.params.type !== 'ogg' ) {
        req.params.type = 'mp3';
    }

    // Initialize visualCaptcha
    visualCaptcha = require( 'visualcaptcha' )( req.session, req.query.namespace );

    visualCaptcha.streamAudio( res, req.params.type );
};

// Fetches and streams an image file
_getImage = function( req, res, next ) {

    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZ");

    var visualCaptcha,
        isRetina = false;

    // Initialize visualCaptcha
    visualCaptcha = require( 'visualcaptcha' )( req.session, req.query.namespace );

    // Default is non-retina
    if ( req.query.retina ) {
        isRetina = true;
    }

    visualCaptcha.streamImage( req.params.index, res, isRetina );
};

// Start and refresh captcha options
_startRoute = function( req, res, next ) {
    var visualCaptcha;

    // Initialize visualCaptcha
    visualCaptcha = require( 'visualcaptcha' )( req.session, req.query.namespace );

    visualCaptcha.generate( req.params.howmany );

    // We have to send the frontend data to use on POST.
    res.status( 200 ).send( visualCaptcha.getFrontendData() );
};

// Try to validate the captcha
// We need to make sure we generate new options after trying to validate, to avoid abuse
_trySubmission = function( req, res, next ) {
    var visualCaptcha,
        namespace = req.query.namespace,
        frontendData,
        queryParams = [],
        imageAnswer,
        audioAnswer,
        responseStatus,
        responseObject;

    // Initialize visualCaptcha
    visualCaptcha = require( 'visualcaptcha' )( req.session, req.query.namespace );

    frontendData = visualCaptcha.getFrontendData();

    // Add namespace to query params, if present
    if ( namespace && namespace.length !== 0 ) {
        queryParams.push( 'namespace=' + namespace );
    }

    // It's not impossible this method is called before visualCaptcha is initialized, so we have to send a 404
    if ( typeof frontendData === 'undefined' ) {
        queryParams.push( 'status=noCaptcha' );

        responseStatus = 404;
        responseObject = 'Not Found';
    } else {
        // If an image field name was submitted, try to validate it
        if ( ( imageAnswer = req.body[ frontendData.imageFieldName ] ) ) {
            if ( visualCaptcha.validateImage( imageAnswer ) ) {
                queryParams.push( 'status=validImage' );

                responseStatus = 200;
            } else {
                queryParams.push( 'status=failedImage' );

                responseStatus = 403;
            }
        } else if ( ( audioAnswer = req.body[ frontendData.audioFieldName ] ) ) {
            // We set lowercase to allow case-insensitivity, but it's actually optional
            if ( visualCaptcha.validateAudio( audioAnswer.toLowerCase() ) ) {
                queryParams.push( 'status=validAudio' );

                responseStatus = 200;
            } else {
                queryParams.push( 'status=failedAudio' );

                responseStatus = 403;
            }
        } else {
            queryParams.push( 'status=failedPost' );

            responseStatus = 500;
        }
    }

    if ( req.accepts( 'html' ) !== undefined ) {
        res.redirect( '/?' + queryParams.join( '&' ) );
    } else {
        res.status( responseStatus );
    }
};

// Routes definition


app.post( '/try', _trySubmission );

// @param type is optional and defaults to 'mp3', but can also be 'ogg'
app.get( '/audio', _getAudio );
app.get( '/audio/:type', _getAudio );

// @param index is required, the index of the image you wish to get
app.get( '/image/:index', _getImage );

// @param howmany is required, the number of images to generate
app.get( '/start/:howmany', _startRoute );

/* End: Captcha */

// Expose app
exports = module.exports = app;
