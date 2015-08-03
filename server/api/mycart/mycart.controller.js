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
var Mycart = require('./mycart.model');

// Get list of things
exports.index = function(req, res) {
  Mycart.find(function (err, mycarts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(mycarts);
  });
};

// Get a single mycart
exports.show = function(req, res) {
  Mycart.findById(req.params.id, function (err, mycart) {
    if(err) { return handleError(res, err); }
    if(!mycart) { return res.status(404).send('Not Found'); }
    return res.json(mycart);
  });
};

// Creates a new mycart in the DB.
exports.create = function(req, res) {
  Mycart.create(req.body, function(err, mycart) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(mycart);
  });
};

// Updates an existing mycart in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mycart.findById(req.params.id, function (err, mycart) {
    if (err) { return handleError(res, err); }
    if(!mycart) { return res.status(404).send('Not Found'); }
    var updated = _.merge(mycart, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(mycart);
    });
  });
};

// Deletes a mycart from the DB.
exports.destroy = function(req, res) {
  Mycart.findById(req.params.id, function (err, mycart) {
    if(err) { return handleError(res, err); }
    if(!mycart) { return res.status(404).send('Not Found'); }
    mycart.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}