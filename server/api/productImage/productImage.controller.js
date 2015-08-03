/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /users              ->  index
 * POST    /users              ->  create
 * GET     /users/:id          ->  show
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 */

'use strict';

var fs = require('fs');
var _ = require('lodash');
var ProductImage = require('./productImage.model');

// Get a single user
exports.show = function(req, res) {
    ProductImage.findById(req.params.id, function (err, user) {
        if(err) { return handleError(res, err); }
        if(!user) { return res.status(404).send('Not Found'); }
        return res.json(user);
    });
};

// Creates a new user in the DB.
exports.create = function(req, res, uploadPath) {

    fs.readFile(req.files.file.path, function (err, data) {
        var fileName = guid();
        var newPath = uploadPath + fileName;
        console.log("newPath > ", newPath);
        fs.writeFile(newPath, data, function (err) {
            return res.status(201).send(fileName);
        });
    });

    return res;
};

function handleError(res, err) {
    return res.status(500).send(err);
}

function addCrossDomainHeader(res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}