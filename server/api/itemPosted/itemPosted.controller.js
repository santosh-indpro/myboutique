/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var ItemPostedCollection = require('./itemPosted.model');

// Get list of things
exports.index = function(req, res) {
  ItemPostedCollection.find(function (err, things) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    return res.status(200).json(things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  ItemPostedCollection.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  ItemPostedCollection.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ItemPostedCollection.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  ItemPostedCollection.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function addCrossDomainHeader(res){
  res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
}