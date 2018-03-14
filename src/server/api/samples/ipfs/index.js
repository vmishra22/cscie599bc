'use strict';

var express = require('express');
var controller = require('./ipfs.controller');

var router = express.Router();



router.get('/connectIpfs', controller.connectIpfs);
router.get('/storeContent', controller.storeContent);


module.exports = router;
