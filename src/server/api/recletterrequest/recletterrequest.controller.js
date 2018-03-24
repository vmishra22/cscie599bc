/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import RecLetterRequest from '../../model/recletterrequests';
import { letterOwnershipContract } from '../web3helper';

export function getRecLetterRequests(req, res) {
  console.log('Entering getRecLetterRequests()..');
  console.log(req.query);

  let loggedInUserName = ''; //get the logged in user name
  let loggedInUserRole = 'RECOMMENDER'; //get the logged in user role

  //if(loggedInUserRole === 'STUDENT' && loggedInUserName === req.query.studentId) {
  if(loggedInUserRole === 'STUDENT') {
    letterOwnershipContract.deployed().then(function(instance) {
      instance.getLetterRequestsByStudentId(10) //TODO: Put req.query.studentId here
        .then(function(requestsIdArray) {
          requestsIdArray.forEach(element => {
            let value = element.c[0];
            RecLetterRequest.find({requestId: value}, function(err, recLetterRequests) {
              if(err) {
                res.json(err);
              } else {
                res.json(recLetterRequests);
              }
            });
          });
        });
    });
 // } else if(loggedInUserRole === 'RECOMMENDER' && loggedInUserName === req.query.recommenderId) {
} else if(loggedInUserRole === 'RECOMMENDER') {
    letterOwnershipContract.deployed().then(function(instance) {
      instance.getLetterRequestsByRecommenderId(10) //TODO: Put req.query.recommenderId here
        .then(function(requestsIdArray) {
          requestsIdArray.forEach(element => {
            let value = element.c[0];
            RecLetterRequest.find({requestId: value}, function(err, recLetterRequests) {
              if(err) {
                res.json(err);
              } else {
                console.log('recLetterRequests', recLetterRequests);
                res.json(recLetterRequests);
              }
            });
          });
        });
    });
  }
}

export function getRecLetterRequest(req, res) {
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

export function createRecLetterRequest(req, res) {
  console.log('Entering createRecLetterRequest()..');
  console.log(req.body);
  let loggedInStudentId = ''; //get logged in user id
  let newLetterRequestId = null;
  letterOwnershipContract.deployed()
    .then(function(instance) {
      let web3 = req.app.get('web3');
      let accounts = web3.eth.accounts;
      //TODO: call creatRequest() like this later,
      // instance.createRequest(loggedInStudentId, req.body.recommenderId, req.body.schoolId, 0,
      instance.createRequest(10, 10, 10, 0, {
        from: accounts[1],
        gas: 3000000
      }).then(function(createRequestResult) {
        //Get the requestId
        console.log(createRequestResult.logs[0].args);
        newLetterRequestId = createRequestResult.logs[0].args['requestId']['c'][0];
        let newLetterRequestStatus = createRequestResult.logs[0].args['status']['c'][0];
        //Use this newLetterRequestId to save with new Request in MongoDB

        let newLetterStatus = newLetterRequestStatus == '0' ? 'Pending' : 'Created';
        let newRecLetterRequest = new RecLetterRequest({
          requestId: newLetterRequestId,
          letterStatus: newLetterStatus,
          studentId: loggedInStudentId,
          studentName: req.body.studentName,
          recommenderId: req.body.recommenderId,
          recommenderName: req.body.recommenderName,
          schoolId: req.body.schoolId,
          schoolName: req.body.schoolName,
          programName: req.body.programName,
          requestDate: (new Date())
        });

        console.log(newRecLetterRequest);
        newRecLetterRequest.save(function(err, recLetterRequest) {
          if(err) {
            res.json(err);
          } else {
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

