'use strict';

var express = require('express');
var controller = require('./recletter.controller');

var router = express.Router();

router.get('/RecommendationLetters', controller.getRecLetters);
router.get('/RecommendationLetter/:id', controller.getRecLetterById);
router.post('/RecommendationLetter', controller.createRecLetter);
router.delete('/RecommendationLetter/:id', controller.deleteRecLetter);


module.exports = router;
