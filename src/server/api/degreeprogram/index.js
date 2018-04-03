'use strict';

let express = require('express');
let controller = require('./degreeprogram.controller');
let router = express.Router();

import * as auth from '../../auth/auth.service';

/**
 * This REST service will return a list of degree programs. A degree program also includes
 * a list of candidate questions to be answered by a recommender when writing a recommendation
 * letter
 *
 * Calling /DegreePrograms will return all the degree program stored in the database
 * Calling /DegreePrograms?schoolId=xxx will return all the degree programs for schoolId
 * Calling /DegreePrograms?schoolId=xxx&programName=xxx will return the specified degree program
 *
 * It returns one or more of the following JSON object:
 * {
 *   "schoolId": "xxx",
 *   "programName": "xxx",
 *   "candidateQuestions": [
 *     {
 *       "questionText": "xxx",
 *       "responseChoices": ["xxx", "xxx", "xxx"]
 *     }
 *   ]
 * }
 *
 */
router.get('/DegreePrograms', controller.getDegreePrograms);

/**
 * This REST service will create a new degree program, along with a list of candidate
 * questions that need ot be answered by a recommender when wriitn a recommendation letter
 *
 * The input is the following JSON object that needs to be sent in the POST payload:
 * {
 *   "schoolId": "xxx",
 *   "programName": "xxx",
 *   "candidateQuestions": [
 *     {
 *       "questionText": "xxx",
 *       "responseChoices": ["xxx", "xxx", "xxx"]
 *     }
 *   ]
 * }
 */
router.post('/DegreeProgram', auth.isAuthenticated(), controller.createDegreeProgram);

/**
 * This REST service will delete a degree program from the database
 * The input is the database Id
 */
router.delete('/DegreeProgram/:id', auth.isAuthenticated(), controller.deleteDegreeProgram);

/**
 * This REST service will return a degree program from the database
 * The input is the database Id
 */
router.get('/DegreeProgram/:id', controller.getDegreeProgram);

module.exports = router;
