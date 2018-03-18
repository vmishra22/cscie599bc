'use strict';

var express = require('express');
var controller = require('./candidatequestion.controller');

var router = express.Router();

router.get('/CandidateQuestions', controller.getCandidateQuestions);
router.post('/CandidateQuestion', controller.createCandidateQuestion);
router.delete('/CandidateQuestion/:id', controller.deleteCandidateQuestion);

router.get('/ProgramCandidateQuestions', controller.getProgramCandidateQuestions);
router.post('/ProgramCandidateQuestion', controller.createProgramCandidateQuestion);
router.delete('/ProgramCandidateQuestion/:id', controller.deleteProgramCandidateQuestion);

module.exports = router;
