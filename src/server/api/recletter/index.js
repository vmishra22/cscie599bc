'use strict';

let express = require('express');
let controller = require('./recletter.controller');

let router = express.Router();

router.get('/RecommendationLetters', controller.getRecLetters);
router.get('/RecommendationLetter/:id', controller.getRecLetter);
router.post('/RecommendationLetter', controller.createRecLetter);
router.delete('/RecommendationLetter/:id', controller.deleteRecLetter);


module.exports = router;
