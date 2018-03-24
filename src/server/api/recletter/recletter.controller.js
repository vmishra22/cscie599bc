/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict'

import RecLetter from '../../model/recletters'
import {ipfs, letterOwnershipContract, ipfsHashToBytes32, bytes32ToIPFSHash} from '../web3helper'


/**
 * Returns a list of submitted recommendation letters where ‘student’ field is
 * the selected student’s ID and ‘school.ID’ field matches the currently logged in ID
 * @param req
 * @param res
 */
export function getRecLetters(req, res) {
  console.log('Entering getRecLetters()..');

  let studentId = parseInt(req.body.studentId, 10);
  let schoolId = parseInt(req.body.schoolId, 10);
  letterOwnershipContract.deployed().then(function(instance) {
    instance.getLettersByStudentAndSchoolId(10, 10) //TODO: Put studentId and schoolId here
      .then(function(lettersIdArray) {
        for(var letterIdValue of lettersIdArray) {
          console.log('letterId: ', letterIdValue);
        }
      })
  })
}

/**
 * //Get the recommendation letter by providing the letter id corresponding to blockchain
 * @param req
 * @param res
 */
export function getRecLetter (req, res) {
  console.log('Entering getRecLetter()..')
  let letterId = parseInt(req.params.id)
  letterOwnershipContract.deployed().then(function (instance) {
    instance.getLetterIPFSLinksByLetterId(letterId)
      .then(function (ipfsbyte32) {
        let pdfFileIPFSHash = bytes32ToIPFSHash(ipfsbyte32[0])
        let jsonFileIPFSHash = bytes32ToIPFSHash(ipfsbyte32[1])
        res.json('pdfFileIPFSHash: ' + pdfFileIPFSHash  + ' jsonFileIPFSHash: ' + jsonFileIPFSHash)
      })
  })
}

/**
 * create a letter in store in ipfs and store the hash in smart contract
 * @param req
 * @param res
 */
export function createRecLetter(req, res) {
  console.log('Entering createRecLetter()..')
  let loggedInRecommenderId = ''; //get logged in user id
  //These Ids need to be passed to contract, currently they are undefined
  let studentId = parseInt(req.body.studentId);
  let recommenderId = parseInt(loggedInRecommenderId);
  let schoolId = parseInt(req.body.schoolId);
  console.log("Student Id:" + req.body.studentId)
  console.log("loggedInRecommenderId:" + loggedInRecommenderId)
  console.log("schoolId:" + req.body.schoolId);

  //This is the new letter Id that's created in the blockchain. MongoDB needs to hold this ID to make the subsequent operation
  //on this letter for viewing, deleting etc.
  var newLetterId = null;
  letterOwnershipContract.deployed().then(function(instance) {
    var web3 = req.app.get('web3');
    var accounts = web3.eth.accounts;
    var letterName = 'Sample Reco Letter';
    var letterPdfBuffer = req.body.recLetterContents;
    var letterjsonBuffer = req.body.candidateQuestions;


    //Hash of IPFS files in bytes32 format to pass to contract method
    var pdfFileHash = null;
    var jsonFileHash = null;

    //Add JSON file in IPFS
    var url1 = Buffer.from(letterjsonBuffer, 'utf8');
    ipfs.add(url1, function(err, result) {
      if(err) {
        console.error('Content submission error:', err);
      } else if(result && result[0] && result[0].hash) {
        console.log('JSON content successfully stored. IPFS address:', result[0].hash);
        jsonFileHash = ipfsHashToBytes32(result[0].hash);

        //Add pdf file in IPFS
        var url2 = Buffer.from(letterPdfBuffer, 'utf8');
        ipfs.add(url2, function(err, res1) {
          if(err) {
            console.error('Content submission error:', err);
          } else if(res1 && res1[0] && res1[0].hash) {
            console.log('PDF content successfully stored. IPFS address:', res1[0].hash);
            pdfFileHash = ipfsHashToBytes32(res1[0].hash);

            instance.createLetter(letterName, 10, 10, 10, pdfFileHash, jsonFileHash, {
              from: accounts[1],
              gas: 3000000
            }).then(function(createLetterResult) {
              //Get the letterId
              newLetterId = createLetterResult.logs[0].args['letterId']['c'][0];

              let newRecLetter = new RecLetter({
                letterId: newLetterId,
                studentId: req.body.studentId,
                recommenderId: loggedInRecommenderId,
                schoolId: req.body.schoolId,
                programName: req.body.programName,
                submissionDate: new Date(),
                recLetterContents: null,
                candidateQuestions: null
              });
              newRecLetter.save(function(err, recLetter) {
                if(err) {
                  res.json(err);
                } else {
                  res.json(recLetter)
                  console.log('Rec Letter data saved in mongoose');
                }
              })
            })
          }//else block of pdf ipfs save
        })
      } else {
        console.log(result);
        console.log(result[0]);
        console.log(result[0].Hash);
        console.error('Unresolved content submission error');
      }
    })
  })
}

export function deleteRecLetter (req, res) {
  console.log('Entering deleteRecLetter...id=' + req.param.id)
  RecLetter.remove({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err)
    }
    else {
      res.json(result)
    }
  })
}




