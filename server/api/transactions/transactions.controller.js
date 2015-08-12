/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /transactions              ->  index
 * GET     /transactions/user-id/:id  ->  transactionsByUserId
 * POST    /transactions              ->  create
 * GET     /transactions/:id          ->  show
 * PUT     /transactions/:id          ->  update
 * DELETE  /transactions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Transaction = require('./transactions.model');

// Get list of transactions
exports.index = function(req, res) {
  Transaction.find(function (err, transactions) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    return res.status(200).json(transactions);
  });
};

// Get list of transactions by user-id
exports.transactionsByUserId = function(req, res) {
    Transaction.find({userID: req.params.userID}, function (err, transactions) {
        if(err) { return handleError(res, err); }

        addCrossDomainHeader(res);
        return res.status(200).json(transactions);
    });
};

// Get a single transaction
exports.show = function(req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!transaction) { return res.status(404).send('Not Found'); }
    return res.json(transaction);
  });
};

// Creates a new transaction in the DB.
exports.create = function(req, res) {
  //console.log("Create trans - Req body",req.body);
  Transaction.create(req.body, function(err, transaction) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    return res.status(201).json(transaction);
  });
};

// Updates an existing transaction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!transaction) { return res.status(404).send('Not Found'); }
    var updated = _.merge(transaction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(transaction);
    });
  });
};

// Deletes a transaction from the DB.
exports.destroy = function(req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!transaction) { return res.status(404).send('Not Found'); }
    transaction.remove(function(err) {
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
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
}