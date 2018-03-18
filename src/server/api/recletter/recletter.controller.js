/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import RecLetter from '../../model/recletters';

export function getRecLetters(req, res) {
  console.log('Entering getRecLetters()..');
  RecLetter.find(function(err, recLetters){
    res.json(recLetters);
  }); 
}

export function getRecLetter(req, res) {
  console.log('Entering getRecLetter()..');
  RecLetter.find({_id: req.params.id}, function(err, result){
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

export function createRecLetter(req, res) {
  console.log('Entering createRecLetter()..');
  console.log(req.body);

  var loggedInRecommenderId = ''; //get logged in user id

  let newRecLetter = new RecLetter({
    studentId: req.body.studentId,
    recommenderId: loggedInRecommenderId,
    schoolId: req.body.schoolId,
    programName: req.body.programName,
    submissionDate: new Date(),
    recLetterContents: req.body.recLetterContents,
    candidateQuestions: req.body.candidateQuestions
  });

  newRecLetter.save(function(err, recLetter) {
    if(err)
    {
        res.json(err);
    }
    else
    {
        res.json(recLetter);
    }
  });
}

export function deleteRecLetter(req, res) {
  console.log('Entering deleteRecLetter...id='+req.param.id);
  RecLetter.remove({_id: req.params.id}, function(err, result){
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

