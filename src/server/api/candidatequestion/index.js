'use strict';

var express = require('express');
var controller = require('./candidatequestion.controller');

var router = express.Router();

router.get('/', controller.getCandidateQuestions);
router.post('/', controller.createCandidateQuestion);
router.delete('/delete/:id', controller.deleteCandidateQuestion);


module.exports = router;
