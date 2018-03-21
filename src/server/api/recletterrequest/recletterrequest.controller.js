/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import RecLetterRequest from '../../model/recletterrequests';

export function getRecLetterRequests(req, res) {
  console.log('Entering getRecLetterRequests()..');
  console.log(req.query);

  var loggedInUserName = ''; //get the logged in user name
  var loggedInUserRole = ''; //get the logged in user role

  if(loggedInUserRole == 'STUDENT' && LoggedInUserName == req.query.studentId)
  {
    RecLetterRequest.find({studentId: req.query.studentId}, function(err, recLetterRequests){
      res.json(recLetterRequests);
    }); 
  }
  else if(loggedInUserRole == 'RECOMMENDER' && LoggedInUserName == req.query.recommenderId)
  {
    RecLetterRequest.find({recommenderId: req.query.recommenderId}, function(err, recLetterRequests){
      res.json(recLetterRequests);
    }); 
  }
  else
  {
    RecLetterRequest.find(function(err, recLetterRequests){
      res.json(recLetterRequests);
    });
  }

}

export function getRecLetterRequest(req, res) {
  console.log('Entering getRecLetterRequest()..');
  RecLetterRequest.find({_id: req.params.id}, function(err, result){
    if(err)
    {
        res.json(err);
    }
    else
    {
        res.json(result);
    }
  });
}

export function createRecLetterRequest(req, res) {
  console.log('Entering createRecLetterRequest()..');
  console.log(req.body);
  
  var loggedInStudentId = ''; //get logged in user id
  let newRecLetterRequest = new RecLetterRequest({
    studentId: loggedInStudentId,
    studentName: req.body.studentName,
    recommenderId: req.body.recommenderId,
    recommenderName: req.body.recommenderName,
    schoolId: req.body.schoolId,
    schoolName: req.body.schoolName,
    programName: req.body.programName,
    requestDate: (new Date())
  });

  newRecLetterRequest.save(function(err, recLetterRequest) {
    if(err)
    {
        res.json(err);
    }
    else
    {
        res.json(recLetterRequest);
    }
  });
}

export function deleteRecLetterRequest(req, res) {
  console.log('Entering deleteRecLetterRequest...id='+req.param.id);
  RecLetterRequest.remove({_id: req.params.id}, function(err, result){
    if(err)
    {
        res.json(err);
    }
    else
    {
        res.json(result);
    }
  });
}

