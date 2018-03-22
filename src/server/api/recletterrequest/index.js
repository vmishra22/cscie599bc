'use strict';

var express = require('express');
var controller = require('./recletterrequest.controller');

var router = express.Router();

/**
 * This REST service will return a list of recommendation letter requests. It can only be called
 * within the context of a logged-in 'STUDENT' or 'RECOMMENDER' role. For a student, it will
 * return all the recommendation requests by the student. For a recommender, it will return all
 * the recommendation requests that need to be completed by the recommender 
 * 
 * 
 * It returns one or more of the following JSON object:
 * {
 *   "studentId": "xxx",
 *   "studentName": "xxx",
 *   "recommenderId": "xxx",
 *   "recommenderName": "xxx",
 *   "schoolId": "xxx",
 *   "schoolName": "xxx",
 *   "programName": "xxx",
 *   "requestDate": "xxx",
 *   "recLetterId": "xxx",
 *   "recLetterSubmissionDate": "xxx"
 * }
 * 
 * If the recLetterId is empty, then the recommendation request is still 'PENDING'. If recLetterId
 * fields contains a database ID for recommendation letter, that means a recommendation letter has
 * already been written corresponding to this request and thus the status of this recommendation
 * letter request is 'COMPLETE' 
 *
 */
router.get('/RecommendationLetterRequests', controller.getRecLetterRequests);

/**
 * This REST service will return a recommendation letter based on its database Id. It can only be 
 * called within the context of a logged-in 'STUDENT' or 'RECOMMENDER' role
 * 
 * It returns the following JSON object:
 * {
 *   "studentId": "xxx",
 *   "studentName": "xxx",
 *   "recommenderId": "xxx",
 *   "recommenderName": "xxx",
 *   "schoolId": "xxx",
 *   "schoolName": "xxx",
 *   "programName": "xxx",
 *   "requestDate": "xxx",
 *   "recLetterId": "xxx",
 *   "recLetterSubmissionDate": "xxx"
 * }
 * 
 * If the recLetterId is empty, then the recommendation request is still 'PENDING'. If recLetterId
 * fields contains a database ID for recommendation letter, that means a recommendation letter has
 * already been written corresponding to this request and thus the status of this recommendation
 * letter request is 'COMPLETE'  
 */
router.get('/RecommendationLetterRequest/:id', controller.getRecLetterRequest);


/**
 * This REST service will create a new recommendation letter request. It can only be 
 * called within the context of a logged-in 'STUDENT'.
 * 
 * The input is the following JSON object that needs to be sent in the POST payload:
 * {
 *   "studentId": "xxx",
 *   "studentName": "xxx",
 *   "recommenderId": "xxx",
 *   "recommenderName": "xxx",
 *   "schoolId": "xxx",
 *   "schoolName": "xxx",
 *   "programName": "xxx",
 *   "requestDate": "xxx"
 * }
 */
router.post('/RecommendationLetterRequest', controller.createRecLetterRequest);

/**
 * This REST service will delete a recommendation letter request from the database
 * The input is the database Id. It can only be called within the context of a 
 * logged-in 'STUDENT'.
 */
router.delete('/RecommendationLetterRequest/:id', controller.deleteRecLetterRequest);


module.exports = router;