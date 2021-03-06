'use strict';

var express = require('express');
var controller = require('./transactions.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/user-id/:userID', controller.transactionsByUserId);
router.get('/owner-id/:ownerId', controller.transactionsOfOwner);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;