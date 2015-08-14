/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /users              ->  index
 * POST    /users              ->  create
 * POST    /users/login        ->  checkLogin
 * POST    /users/register     ->  registerUser
 * GET     /users/:id          ->  show
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('./users.model');

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    return res.status(200).json(users);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!user) { return res.status(404).send('Not Found'); }
    return res.json(user);
  });
};

// Register user
exports.registerUser = function(req, res) {
    User.find({ mobile: req.body.mobile }, function (err, user) {
        if(err) { return handleError(res, err); }

        addCrossDomainHeader(res);
        if(!user) { return res.status(404).send('Not Found'); }

        //console.log("Check Register api: ", user);
        if(user.length === 0){
            User.create(req.body, function(err, user) {
                if(err) { return handleError(res, err); }

                addCrossDomainHeader(res);
                return res.status(201).json({status: true});
            });
        } else {
            return res.json({status: false});
        }

    });
};

// Check user login
exports.checkLogin = function(req, res) {
    console.log("User info api : ", req.body);
    User.find({ mobile: req.body.mobile, password: req.body.password }, function (err, user) {
        if(err) { return handleError(res, err); }

        addCrossDomainHeader(res);
        if(!user) { return res.status(404).send('Not Found'); }
        return res.json(user);
    });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    return res.status(201).json(user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!user) { return res.status(404).send('Not Found'); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!user) { return res.status(404).send('Not Found'); }
    user.remove(function(err) {
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