/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import RecLetterRequest from '../../model/recletterrequests';
import { letterOwnershipContract } from '../web3helper';

export function getRecLetterRequests (req, res) {
  console.log('Entering getRecLetterRequests()..');
  console.log(req.query);

  let loggedInUserName = ''; //get the logged in user name
  let loggedInUserRole = ''; //get the logged in user role

  if (loggedInUserRole === 'STUDENT' && loggedInUserName === req.query.studentId) {
    RecLetterRequest.find({studentId: req.query.studentId}, function (err, recLetterRequests) {
      res.json(recLetterRequests);
    });
  }
  else if (loggedInUserRole === 'RECOMMENDER' && LoggedInUserName === req.query.recommenderId) {
    RecLetterRequest.find({recommenderId: req.query.recommenderId}, function (err, recLetterRequests) {
      res.json(recLetterRequests);
    });
  }
  else {
    RecLetterRequest.find(function (err, recLetterRequests) {
      res.json(recLetterRequests);
    });
  }

}

export function getRecLetterRequest (req, res) {
  console.log('Entering getRecLetterRequest()..');
  RecLetterRequest.find({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
}

export function createRecLetterRequest (req, res) {
  console.log('Entering createRecLetterRequest()..');
  console.log(req.body);
  let loggedInStudentId = ''; //get logged in user id
  let newLetterRequestId = null;
  letterOwnershipContract.deployed()
    .then(function (instance) {
      let web3 = req.app.get('web3');
      let accounts = web3.eth.accounts;
      //TODO: call creatRequest() like this later,
      // instance.createRequest(loggedInStudentId, req.body.recommenderId, req.body.schoolId, 0,
      instance.createRequest(10, 10, 10, 0, {
        from: accounts[1],
        gas: 3000000
      }).then(function (createRequestResult) {
        //Get the requestId
        console.log(createRequestResult.logs[0].args);
        newLetterRequestId = createRequestResult.logs[0].args['requestId']['c'][0];
        //Use this newLetterRequestId to save with new Request in MongoDB

        let newRecLetterRequest = new RecLetterRequest({
          requestId: newLetterRequestId,
          studentId: loggedInStudentId,
          studentName: req.body.studentName,
          recommenderId: req.body.recommenderId,
          recommenderName: req.body.recommenderName,
          schoolId: req.body.schoolId,
          schoolName: req.body.schoolName,
          programName: req.body.programName,
          requestDate: (new Date())
        });

        newRecLetterRequest.save(function (err, recLetterRequest) {
          if (err) {
            res.json(err);
          }
          else {
            console.log('Request saved in mongoDB');
            res.json(recLetterRequest);
          }
        });
      });
    });
}

export function deleteRecLetterRequest (req, res) {
  console.log('Entering deleteRecLetterRequest...id=' + req.param.id);
  RecLetterRequest.remove({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
}

