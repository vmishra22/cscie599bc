'use strict';

let express = require('express');
let controller = require('./recletter.controller');

let router = express.Router();

import * as auth from '../../auth/auth.service';

router.get('/StudentsWithRecommendationLetters', auth.isAuthenticated(), controller.getStudentsWithRecLetters);
router.get('/RecommendationLetters', auth.isAuthenticated(), controller.getRecLetters);
router.get('/RecommendationLetter/:id', auth.isAuthenticated(), controller.getRecLetter);
router.post('/RecommendationLetter', auth.isAuthenticated(), controller.createRecLetter);
router.delete('/RecommendationLetter/:id', auth.isAuthenticated(), controller.deleteRecLetter);


module.exports = router;
