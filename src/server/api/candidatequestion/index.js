'use strict';

var express = require('express');
var controller = require('./candidatequestion.controller');

var router = express.Router();

router.get('/CandidateQuestions', controller.getCandidateQuestions);
router.post('/CandidateQuestion', controller.createCandidateQuestion);
router.delete('/CandidateQuestion/:id', controller.deleteCandidateQuestion);


module.exports = router;
