/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict'

import RecLetter from '../../model/recletters';
import fs from 'fs';

var bs58 = require('bs58');
var IpfsAPI = require('ipfs-api');

const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const contract = require('truffle-contract');
import letterOwnershipArtifact from '../../../LetterContract/build/contracts/LetterOwnership.json';

var letterOwnershipContract = contract(letterOwnershipArtifact);
letterOwnershipContract.setProvider(provider);
var letterOwnershipInstance;

//Returns a list of submitted recommendation letters where ‘student’ field is the selected student’s ID and ‘school.ID’ field matches the currently logged in ID 
export function getRecLetters(req, res) {
  console.log('Entering getRecLetters()..');

  var studentId = parseInt(req.body.studentId, 10);
  var schoolId = parseInt(req.body.schoolId, 10);

  letterOwnershipContract.deployed().then(function(instance) {
    letterOwnershipInstance = instance;
    
    letterOwnershipInstance.getLettersByStudentAndSchoolId(10, 10) //TODO: Put studentId and schoolId here
    .then(function(lettersIdArray) {
      for(var letterIdValue of lettersIdArray) {
        console.log('letterId: ', letterIdValue);
        //Find this letterId in mongoose and return to app UI
        RecLetter.find({ 'letterId': letterIdValue}, function(err, result) {
          if(err) {
            console.log(err);
            //res.json(err);
          } else {
            console.log(result);
            res.json(result);
          }
        });
      }
    });
  })
  .then(function(res1) {
    console.log(res1);
  })
  .catch(function(e) {
    console.log(e);
  });
}

//Get the recommendation letter by providing the letter id corresponding to blockchain  
 export function getRecLetterById(req, res) {
//   console.log('Entering getRecLetter()..');

//   var letterId = parseInt(req.body.letterId, 10);
//   letterOwnershipContract.deployed().then(function(instance) {
//     letterOwnershipInstance = instance;
//     console.log('letterOwnershipInstance', letterOwnershipInstance);
//     letterOwnershipInstance.getLetterIPFSLinksByLetterId(0) //TODO: Put letterId here
//     .then(function(letterLinksArray) {
//       var pdfFileIPFSHash = bytes32ToIPFSHash(letterLinksArray[0]);
//       var jsonFileIPFSHash = bytes32ToIPFSHash(letterLinksArray[1]);
//     });
//   })
//   .then(function(res1) {
//     console.log(res1);
//   })
//   .catch(function(e) {
//     console.log(e);
//   });

//   RecLetter.find({_id: req.params.id}, function(err, result) {
//     if(err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
 }

function ipfsHashToBytes32(ipfsHash) {
  var h = bs58.decode(ipfsHash).toString('hex')
    .replace(/^1220/, '');
  if(h.length != 64) {
    console.log('invalid ipfs format', ipfsHash, h);
    return null;
  }
  return '0x' + h;
}

function bytes32ToIPFSHash(hashHex) {
  //console.log('bytes32ToIPFSHash starts with hash_buffer', hash_hex.replace(/^0x/, ''));
  var buf = new Buffer(hashHex.replace(/^0x/, '1220'), 'hex');
  return bs58.encode(buf);
}



export function createRecLetter(req, res) {
  console.log('Entering createRecLetter()..');
  //console.log(req.body);

  var loggedInRecommenderId = '' //get logged in user id
  //These Ids need to be passed to contract, currently they are undefined
  var studentId = parseInt(req.body.studentId);
  var recommenderId = parseInt(loggedInRecommenderId);
  var schoolId =  parseInt(req.body.schoolId);
  console.log(req.body.studentId + "  " +loggedInRecommenderId + "  " +  req.body.schoolId);

  //This is the new letter Id thats created in the blockchain. MongoDB needs to hold this ID to make the subsequent operation
  //on this letter for viewing, deleting etc. 
  var newLetterId = null;
  //Deploy the contract using truffle api.
  letterOwnershipContract.deployed().then(function(instance) {
    var web3 = req.app.get('web3');
    letterOwnershipInstance = instance;
    var accounts = web3.eth.accounts;
    var letterName = 'Sample Reco Letter';
    var letterPdfBuffer = req.body.recLetterContents;
    var letterjsonBuffer = req.body.candidateQuestions;

    var ipfsHost = 'localhost';
    var ipfsAPIPort = '5001';
    // IPFS connection setup
    var ipfs = IpfsAPI(ipfsHost, ipfsAPIPort);
    ipfs.swarm.peers(function(err, response) {
      if(err) {
        console.error(err);
      } else {
        console.log('IPFS - connected to ' + response.length + ' peers');
      }
    });

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

            letterOwnershipInstance.createLetter(letterName, 10, 10, 10, pdfFileHash, jsonFileHash, {
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
                  console.log('Rec Letter data saved in mongoose');
                }
              });
            });
          }//else block of pdf ipfs save
        });
      } else {
        console.log(result);
        console.log(result[0]);
        console.log(result[0].Hash);
        console.error('Unresolved content submission error');
      }
    });
  })
  .then(function(res1) {
    console.log(res1);
  })
  .catch(function(e) {
    console.log(e);
  });

  // newRecLetter.save(function (err, recLetter) {
  //   if (err) {
  //     res.json(err)
  //   }
  //   else {
  //     res.json(recLetter)
  //   }
  // })
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


