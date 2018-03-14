'use strict';

var express = require('express');
var controller = require('./eth.controller');
var router = express.Router();

router.get('/', controller.index);
router.get('/runAnotherSample', controller.runAnotherSample);
router.get('/runContract', controller.runContract);
router.get('/runLetterContract', controller.runLetterContract);
router.get('/callStorageContract', controller.callStorageContract);


module.exports = router;
