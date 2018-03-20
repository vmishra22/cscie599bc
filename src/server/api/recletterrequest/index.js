'use strict';

var express = require('express');
var controller = require('./recletterrequest.controller');

var router = express.Router();

router.get('/RecommendationLetterRequests', controller.getRecLetterRequests);
router.get('/RecommendationLetterRequest/:id', controller.getRecLetterRequest);
router.post('/RecommendationLetterRequest', controller.createRecLetterRequest);
router.delete('/RecommendationLetterRequest/:id', controller.deleteRecLetterRequest);


module.exports = router;
