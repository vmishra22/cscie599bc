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

  if(!req.user) {
    res.status(403).render();
  }

  let loggedInUserId = req.user._id; //get the logged in user name
  let loggedInUserRole = req.user.role; //get the logged in user role

  //hardcoding the ID just for testing
  loggedInUserId = 10;

  //if(loggedInUserRole === 'STUDENT' && loggedInUserName === req.query.studentId) {
  if(loggedInUserRole === 'student') {
    letterOwnershipContract.deployed().then(function(instance) {
      instance.getLetterRequestsByStudentId(loggedInUserId)
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
} else if(loggedInUserRole === 'recommender') {
    letterOwnershipContract.deployed().then(function(instance) {
      instance.getLetterRequestsByRecommenderId(loggedInUserId)
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
  } else {
    res.status(403).render();
  }
}

export function getRecLetterRequest(req, res) {
  console.log('Entering getRecLetterRequest()..');

  if(!req.user) {
    res.status(403).render();
  }

  let loggedInUserId = req.user._id; //get the logged in user name
  let loggedInUserRole = req.user.role; //get the logged in user role

  RecLetterRequest.find({_id: req.params.id}, function(err, result) {
    if(err) {
      res.json(err);
    } else if(loggedInUserRole === 'student' && loggedInUserId != result.studentId) {
        res.status(403).render();
      } else if(loggedInUserRole === 'recommender' && loggedInUserId != result.recommenderId) {
        res.status(403).render();
      } else {
        res.json(result);
      }
  });
}

export function createRecLetterRequest(req, res) {
  console.log('Entering createRecLetterRequest()..');
  console.log(req.body);

  if(!req.user) {
    res.status(403).render();
  }

  if(!req.body) {
    res.status(400).render();
  }

  let loggedInUserId = req.user._id; //get the logged in user name
  let loggedInUserRole = req.user.role; //get the logged in user role

  if(loggedInUserRole != 'student' || loggedInUserId != req.body.studentId) {
    res.status(403).render();
  }

  let newLetterRequestId = null;
  letterOwnershipContract.deployed()
    .then(function(instance) {
      let web3 = req.app.get('web3');
      let accounts = web3.eth.accounts;
      //TODO: call creatRequest() like this later,
      // instance.createRequest(loggedInUserId, req.body.recommenderId, req.body.schoolId, 0,
      instance.createRequest('10', '10', '10', 0, {
        from: accounts[1],
        gas: 3000000
      }).then(function(createRequestResult) {
        //Get the requestId
        console.log(createRequestResult.logs[0].args);
        newLetterRequestId = createRequestResult.logs[0].args.requestId.c[0];
        let newLetterRequestStatus = createRequestResult.logs[0].args.status.c[0];
        //Use this newLetterRequestId to save with new Request in MongoDB

        let newLetterStatus = newLetterRequestStatus == '0' ? 'Pending' : 'Created';
        let newRecLetterRequest = new RecLetterRequest({
          requestId: newLetterRequestId,
          letterStatus: newLetterStatus,
          studentId: loggedInUserId,
          studentName: req.body.studentName,
          recommenderId: req.body.recommenderId,
          recommenderName: req.body.recommenderName,
          schoolId: req.body.schoolId,
          schoolName: req.body.schoolName,
          programName: req.body.programName,
          requestDate: new Date()
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


export function deleteRecLetterRequest(req, res) {
  console.log(`Entering deleteRecLetterRequest...id=${req.param.id}`);

  if(!req.user) {
    res.status(403).render();
  }

  let loggedInUserRole = req.user.role; //get the logged in user role

  if(loggedInUserRole != 'admin') {
    res.status(403).render();
  }

  RecLetterRequest.remove({_id: req.params.id}, function(err, result) {
    if(err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}

