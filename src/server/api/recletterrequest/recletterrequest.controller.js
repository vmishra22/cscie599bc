/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

var async = require('async');
import RecLetterRequest from '../../model/recletterrequests';
import { letterOwnershipContract } from '../web3helper';

export function getRecLetterRequests(req, res) {
  console.log('Entering server getRecLetterRequests()..');
  //console.log(req);

  if(!req.user) {
    res.status(403).render();
  }

  console.log(req.user);
  let loggedInUserId = req.user._id; //get the logged in user name
  let loggedInUserRole = req.user.role; //get the logged in user role

  console.log("loggedInUserId: ", loggedInUserId);
  console.log("loggedInUserRole: ", loggedInUserRole);
  //hardcoding the ID just for testing
 // loggedInUserId = 10;
  
  //if(loggedInUserRole === 'STUDENT' && loggedInUserName === req.query.studentId) {
    if(loggedInUserRole === 'student') {
   letterOwnershipContract.deployed().then(function(instance) {
      instance.getLetterRequestsByStudentId(String(loggedInUserId))
        .then(function(requestsIdArray) {
          console.log("requestsIdArray: ", requestsIdArray);
          var requestResults = [];

          async.eachSeries(requestsIdArray, function(item, callback) {
            let value = item.c[0];
            RecLetterRequest.find({requestId: value}, function(err, x) {
              let result1 = {
                letterId: x[0].requestId,
                requestDate: x[0].requestDate,
                letterStatus: x[0].letterStatus,
                studentId: x[0].studentId,
                studentName: x[0].studentName,
                schoolId: x[0].schoolId,
                schoolName: x[0].schoolName,
                programName: x[0].programName,
                recommenderName: x[0].recommenderName
              };
              requestResults.push(result1);
              callback(err);
            });
          }, function(err) {
            if (err) throw err;
            console.log("done");
            return res.json(requestResults);
          });
        });
    });
 // } else if(loggedInUserRole === 'RECOMMENDER' && loggedInUserName === req.query.recommenderId) {
} else if(loggedInUserRole === 'recommender' ) {
     letterOwnershipContract.deployed().then(function(instance) {
      instance.getLetterRequestsByRecommenderId(String(loggedInUserId))
        .then(function(requestsIdArray) {
          console.log("requestsIdArray: ", requestsIdArray);
          var pendingRequestResults = [];
          var submittedRequestResults = [];
          var accumulatedResults = {};
          async.eachSeries(requestsIdArray, function(item, callback) {
            
            let value = item.c[0];
            RecLetterRequest.find({requestId: value, recommenderId: loggedInUserId}, function(err, x) {
              console.log(x);
              if(x.length > 0){
                let result1 = {
                  letterId: x[0].requestId,
                  requestDate: x[0].requestDate,
                  letterStatus: x[0].letterStatus,
                  studentId: x[0].studentId,
                  studentName: x[0].studentName,
                  schoolId: x[0].schoolId,
                  schoolName: x[0].schoolName,
                  programName: x[0].programName,
                  recommenderName: x[0].recommenderName
                };
                if(x[0].letterStatus === "Pending"){
                  pendingRequestResults.push(result1);
                } else if(x[0].letterStatus === "Created"){
                  submittedRequestResults.push(result1);
                }
              }
              
              callback(err);
            });
          }, function(err) {
            if (err) throw err;
            console.log("done");
            accumulatedResults.created = submittedRequestResults;
            accumulatedResults.pending = pendingRequestResults;
            return res.json(accumulatedResults);
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

  RecLetterRequest.find({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      if(loggedInUserRole === 'student' && loggedInUserId != result.studentId) {
        res.status(403).render();
      }
      else if (loggedInUserRole === 'recommender' && loggedInUserId != result.recommenderId) {
        res.status(403).render();
      }
      else {
        res.json(result);
      }
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

  let recommenderId = req.body.recommenderId;
  let schoolId = req.body.schoolId;

  console.log("studentId: ", loggedInUserId);
  console.log("recommenderId: ", recommenderId);
  console.log("schoolId: ", schoolId);

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
      instance.createRequest(String(loggedInUserId), String(recommenderId), String(schoolId), 0, {
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
          studentId: loggedInUserId,
          studentName: req.body.studentName,
          recommenderId: req.body.recommenderId,
          recommenderName: req.body.recommenderName,
          schoolId: req.body.schoolId,
          schoolName: req.body.schoolName,
          programName: req.body.programName,
          requestDate: (new Date())
        });

        console.log('newRecLetterRequest data: ', newRecLetterRequest);
        newRecLetterRequest.save(function(err, recLetterRequest) {
          if(err) {
            res.json(err);
          } else {
            console.log('Request saved in mongoDB');
            res.json(recLetterRequest);
          }
        });
      });
    })
    .catch(function(error) {
      console.log('Error in createRequest call:', error);
    });
}


export function deleteRecLetterRequest (req, res) {
  console.log('Entering deleteRecLetterRequest...id=' + req.param.id);

  if(!req.user) {
    res.status(403).render();
  }

  let loggedInUserRole = req.user.role; //get the logged in user role

  if(loggedInUserRole != 'admin') {
    res.status(403).render();
  }

  RecLetterRequest.remove({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
}

