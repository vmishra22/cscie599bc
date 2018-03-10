'use strict';

var express = require('express');
var controller = require('./eth.controller');

var router = express.Router();

router.get('/accounts', controller.getAccounts);
router.get('/contract', controller.getContractInfo)
router.get('/fullSample', controller.runSample);
router.get('/', controller.index);

module.exports = router;
