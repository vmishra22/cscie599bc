'use strict';

var express = require('express');
var controller = require('./recletter.controller');

var router = express.Router();

router.get('/', controller.getRecLetters);
router.post('/', controller.createRecLetter);
router.delete('/delete/:id', controller.deleteRecLetter);


module.exports = router;
