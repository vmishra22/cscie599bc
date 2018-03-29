
'use strict';

import DegreeProgram from '../../model/degreeprograms';



export function getDegreePrograms(req, res) {
  console.log('Entering getDegreePrograms()..');
  console.log(req.query);

  if(req.query.schoolId && req.query.programName) {
    DegreeProgram.find({schoolId: req.query.schoolId, programName: req.query.programName}, 
      function(err, degreeProgram){
      res.json(degreeProgram);
    });
  }
  else if(req.query.schoolId) {
    DegreeProgram.find({schoolId: req.query.schoolId}, 
      function(err, degreeProgram){
      res.json(degreeProgram);
    });
  }
  else {
    DegreeProgram.find(function(err, degreeProgram) {
      res.json(degreeProgram);
    });
  }
}


 
export function createDegreeProgram(req, res) {
  console.log('Entering createDegreeProgram()..');
  console.log(req.body);

  let newDegreeProgram = new DegreeProgram({
    schoolId: req.body.schoolId,
    schoolName: req.body.schoolName,
    programName: req.body.programName,
    candidateQuestions: req.body.candidateQuestions
  });

  newDegreeProgram.save(function(err, newDegreeProgram){
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(newDegreeProgram);
    }
  });
}

export function deleteDegreeProgram(req, res) {
  console.log("Entering deleteDegreeProgram()..id="+req.params.id);
  DegreeProgram.remove({_id: req.params.id}, function(err, result) {
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
