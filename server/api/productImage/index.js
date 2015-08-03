'use strict';

var express = require('express');
var controller = require('./productImage.controller');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/', controller.create);


module.exports = router;