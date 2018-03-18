/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import CandidateQuestion from '../../model/candidatequestions';
import ProgramCandidateQuestion from '../../model/program_candidatequestions';

export function getCandidateQuestions(req, res) {
  console.log('Entering getCandidateQuestions()..');
  if(req.query.schoolId && req.query.programName)
  {
    console.log(req.query.schoolId);
    console.log(req.query.programName);
    console.log(req.query.schoolId);
    ProgramCandidateQuestion.find({schoolId: req.query.schoolId, programName: req.query.programName}, 
      function(err, programCandidateQuestion){
      res.json(programCandidateQuestion);
    }); 

  }
  else if(req.query.schoolId)
  {
    console.log(req.query.schoolId);
    ProgramCandidateQuestion.find({schoolId: req.query.schoolId}, 
      function(err, programCandidateQuestion){
      res.json(programCandidateQuestion);
    }); 

  }
  else
  {
    CandidateQuestion.find(function(err, candidateQuestion){
      res.json(candidateQuestion);
    }); 
  }
}

export function createCandidateQuestion(req, res) {
  console.log('Entering createCandidateQuestion()..');
  console.log(req.body.questionText);
  console.log(req.body.responseChoices);

  let newCandidateQuestion = new CandidateQuestion({
    questionText: req.body.questionText,
    responseChoices: req.body.responseChoices
  });

  newCandidateQuestion.save(function(err, candidateQuestion){
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(candidateQuestion);
    }
  });
}

export function deleteCandidateQuestion(req, res) {
  console.log("Entering deleteCandidateQuestion()..id="+req.params.id);
  CandidateQuestion.remove({_id: req.params.id}, function(err, result) {
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

