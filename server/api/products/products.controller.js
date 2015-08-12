/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /products              ->  index
 * POST    /products              ->  create
 * GET     /products/:id          ->  show
 * PUT     /products/:id          ->  update
 * DELETE  /products/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Product = require('./products.model');
var User = require('../users/users.model');

// Get list of products
exports.index = function(req, res) {
  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    return res.status(200).json(products);
  });
};

// Get list of products with userinfo
exports.productListWithUsers = function(req, res) {
    Product.find(function (err, products) {
        if(err) { return handleError(res, err); }

        // User get
        User.find(function (err, users) {
            var productsWithUsers = [], productsCount = products.length;
            if(err) { return handleError(res, err); }

            if(productsCount > 0){
                products.forEach(function(productInfo, productKey){
                    //console.log('product key : ',productKey);
                    users.forEach(function(userInfo, userKey){
                        //console.log('user key : ',userKey);
                        if(productInfo.userID === userInfo._id){
                            productsWithUsers.push({ productInfo: productInfo, userInfo: userInfo });
                            if(productKey === (productsCount - 1)){
                                console.log('productsWithUsers : ',productsWithUsers);
                                addCrossDomainHeader(res);
                                return res.status(200).json(productsWithUsers);
                            }
                        }
                    });
                });
            } else {
                addCrossDomainHeader(res);
                return res.status(200).json(productsWithUsers);
            }

        });

    });
};
// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    return res.status(201).json(product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!product) { return res.status(404).send('Not Found'); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }

    addCrossDomainHeader(res);
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
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