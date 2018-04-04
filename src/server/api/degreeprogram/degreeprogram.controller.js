
'use strict';

import DegreeProgram from '../../model/degreeprograms';


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

export function getDegreePrograms(req, res) {
  console.log('Entering getDegreePrograms()..');
  console.log(req.query);

  if(req.query.schoolId && req.query.programName) {
    return DegreeProgram.find({schoolId: req.query.schoolId, programName: { $regex: `.*${req.query.programName}.*` }}).exec()
    .then(degreePrograms => {
      res.status(200).json(degreePrograms);
    })
    .catch(handleError(res));
  } else if(req.query.schoolId) {
    return DegreeProgram.find({schoolId: req.query.schoolId}).exec()
    .then(degreePrograms => {
      res.status(200).json(degreePrograms);
    })
    .catch(handleError(res));
  } else if(req.query.programName) {
    DegreeProgram.find({programName: { $regex: `.*${req.query.programName}.*` }}).exec()
    .then(degreePrograms => {
      res.status(200).json(degreePrograms);
    })
    .catch(handleError(res));
  } else if(req.query.schoolName) {
    DegreeProgram.find({schoolName: { $regex: `.*${req.query.schoolName}.*` }}).exec()
    .then(degreePrograms => {
      res.status(200).json(degreePrograms);
    })
    .catch(handleError(res));
  } else {
    DegreeProgram.find().exec()
    .then(degreePrograms => {
      res.status(200).json(degreePrograms);
    })
    .catch(handleError(res));
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

  newDegreeProgram.save(function(err, program) {
    if(err) {
      res.json(err);
    } else {
      res.json(program);
    }
  });
}

export function deleteDegreeProgram(req, res) {
  console.log(`Entering deleteDegreeProgram()..id=${req.params.id}`);
  DegreeProgram.remove({_id: req.params.id}, function(err, result) {
    if(err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}

export function getDegreeProgram(req, res) {
  console.log(`Entering getDegreeProgram()..id=${req.params.id}`);
  DegreeProgram.findOne({_id: req.params.id}, function(err, result) {
    if(err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}
