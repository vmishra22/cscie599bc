/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import CandidateQuestion from '../../model/candidatequestions';
import ProgramCandidateQuestion from '../../model/program_candidatequestions';

export function getCandidateQuestions(req, res) {
  console.log('Entering getCandidateQuestions()..');
  CandidateQuestion.find(function(err, candidateQuestion){
    res.json(candidateQuestion);
  }); 
}

export function createCandidateQuestion(req, res) {
  console.log('Entering createCandidateQuestion()..');
  console.log(req.body);

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


export function getProgramCandidateQuestions(req, res) {
  console.log('Entering getProgramCandidateQuestions()..');
  console.log(req.query);

  ProgramCandidateQuestion.find({schoolId: req.query.schoolId, programName: req.query.programName}, 
    function(err, programCandidateQuestion){
    res.json(programCandidateQuestion);
  }); 
}

 
export function createProgramCandidateQuestion(req, res) {
  console.log('Entering createProgramCandidateQuestion()..');
  console.log(req.body);

  let newProgramCandidateQuestion = new ProgramCandidateQuestion({
    schoolId: req.body.schoolId,
    programName: req.body.programName,
    questionText: req.body.questionText,
    responseChoices: req.body.responseChoices
  });

  newProgramCandidateQuestion.save(function(err, newProgramCandidateQuestion){
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(newProgramCandidateQuestion);
    }
  });
}

export function deleteProgramCandidateQuestion(req, res) {
  console.log("Entering deleteProgramCandidateQuestion()..id="+req.params.id);
  ProgramCandidateQuestion.remove({_id: req.params.id}, function(err, result) {
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

