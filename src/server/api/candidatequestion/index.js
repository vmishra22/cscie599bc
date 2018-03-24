'use strict';

let express = require('express');
let controller = require('./candidatequestion.controller');

import * as auth from '../../auth/auth.service';

let router = express.Router();

/**
 * This REST service will return a master list of candidate questions supported by the
 * system. A subset of this master list can be required by individual degree programs
 * to be answered by a recommender
 *
 * It returns a list of the following JSON object:
 * {
 *   "questionText": "xxx",
 *   "responseChoices": ["xxx", "xxx", "xxx"]
 * }
 *
 */
router.get('/CandidateQuestions', auth.isAuthenticated(), controller.getCandidateQuestions);

/**
 * This REST service will add a candidate question to the master list of questions.
 * As a practical matter, the full master list will likely be seeded in the database,
 * so this service to add individual questions may not be needed much
 *
 * The input is the following JSON object that needs to be sent in the POST payload:
 * {
 *   "questionText": "xxx",
 *   "responseChoices": ["xxx", "xxx", "xxx"]
 * }
 *
 */
router.post('/CandidateQuestion', auth.isAuthenticated(), controller.createCandidateQuestion);

/**
 * This REST service will delete a candidate questions from the database
 * The input is the database Id
 */
router.delete('/CandidateQuestion/:id', auth.isAuthenticated(), controller.deleteCandidateQuestion);

module.exports = router;
