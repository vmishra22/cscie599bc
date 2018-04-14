/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import RecLetterRequest from '../../model/recletterrequests';
import RecLetter from '../../model/recletters';
import { ipfs, letterOwnershipContract, ipfsHashToBytes32, bytes32ToIPFSHash } from '../web3helper';


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}


/**
 * Get list of students who have recommendation letters
 */
export function getStudentsWithRecLetters(req, res) {
  console.log('Entering getStudentsWithRecLetters()..');
  console.log(req.query);

  if(!req.user) {
    res.status(403).render();
  }

  let loggedInUserId = req.user._id; //get the logged in user id
  let loggedInUserRole = req.user.role; //get the logged in user role

  if(loggedInUserRole === 'school') {
    if(req.query.studentName) {
      return RecLetter.find({schoolId: loggedInUserId, studentName: { $regex: '.*' + req.query.studentName + '.*' }}).exec()
      .then(recletters => {
        return res.status(200).json(recletters);
      })
      .catch(handleError(res));
    }
  }
  else {
    res.status(403).render();
  }
}

/**
 * Returns a list of submitted recommendation letters where ‘student’ field is
 * the selected student’s ID and ‘school.ID’ field matches the currently logged in ID
 * @param req
 * @param res
 */
export function getRecLetters (req, res) {
  console.log('Entering server getRecLetters()..');

  let studentId = parseInt(req.body.studentId, 10);
  let schoolId = parseInt(req.body.schoolId, 10);
  letterOwnershipContract.deployed().then(function(instance) {
    instance.getLettersByStudentAndSchoolId('10', '10') //TODO: Put studentId and schoolId here
      .then(function(lettersIdArray) {
        res.json(lettersIdArray);
      });
  });
}

/**
 * //Get the recommendation letter by providing the letter id corresponding to blockchain
 * @param req
 * @param res
 */
export function getRecLetter(req, res) {
  console.log('Entering getRecLetter()..');
  const letterId = parseInt(req.params.id, 10);
  letterOwnershipContract.deployed().then(function(instance) {
    instance.getLetterIPFSLinksByLetterId(letterId)
      .then(function(ipfsbyte32) {
        const pdfFileIPFSHash = bytes32ToIPFSHash(ipfsbyte32[0]);
        const questionsJsonHash = bytes32ToIPFSHash(ipfsbyte32[1]);

        let pdfDataAsStr;
        let questionsData;

        ipfs.get(pdfFileIPFSHash)
        .then((files) => {
            console.log("Successfully retrieved pdf from IPFS.")
            pdfDataAsStr = files[0].content.toString('utf8');
            return ipfs.get(questionsJsonHash);
        })
        .then((files) => {
            console.log("Successfully retrieved questions from IPFS.")
            questionsData = JSON.parse(files[0].content.toString());

            if(pdfDataAsStr && questionsData) {
              const result = {
                'questionsData' : questionsData,
                'pdfDataAsStr' : pdfDataAsStr
              };

              return res.json(result);
            } else {
              console.log("An error occurred. Either pdf data or questions data had issues.")
            }
        });
      });
  });
}

/**
 * create a letter in store in ipfs and store the hash in smart contract
 * @param req
 * @param res
 */
export function createRecLetter(req, res) {
  console.log('Entering createRecLetter()..');
  let loggedInRecommenderId = req.user._id; //get logged in user id
  let loggedInRecommenderName = req.user.name;
  //These Ids need to be passed to contract, currently they are undefined
  let studentId = req.body.studentId;
  let recommenderId = req.user._id;
  let schoolId = req.body.schoolId;
  console.log('Student Id:' + req.body.studentId);
  console.log('loggedInRecommenderId:' + loggedInRecommenderId);
  console.log('loggedInRecommenderName:' + loggedInRecommenderName);
  console.log('schoolId:' + req.body.schoolId);

  //This is the new letter Id that's created in the blockchain. MongoDB needs to hold this ID to make the subsequent operation
  //on this letter for viewing, deleting etc.
  let newLetterId = null;
  letterOwnershipContract.deployed()
  .then(function(instance) {
    let web3 = req.app.get('web3');
    let accounts = web3.eth.accounts;
    let letterName = 'Reco Letter for Student:' + studentId;
    let letterPdfBuffer = req.body.recLetterContents;
    let letterjsonBuffer = req.body.candidateQuestions;

    //Hash of IPFS files in bytes32 format to pass to contract method
    let pdfFileHash = null;
    let jsonFileHash = null;

    //Add JSON file in IPFS
    let url1 = Buffer.from(JSON.stringify(letterjsonBuffer));
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

            instance.createLetter(letterName, String(studentId), String(recommenderId), String(schoolId), pdfFileHash, jsonFileHash, {
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
                studentName: req.body.studentName,
                recommenderName: loggedInRecommenderName,
                programName: req.body.programName,
                submissionDate: new Date()
              });
              newRecLetter.save(function(err, recLetter) {
                if(err) {
                  res.json(err);
                } else {
                  res.json(recLetter);
                  console.log('Rec Letter data saved in mongoose');

                  //Change the corresponding letter request as completed:
                  // console.log(instance);
                  instance.changeRequestStatus(newLetterId, 1, {
                    from: accounts[0],
                    gas: 3000000
                  }).then(function(reqStatusResult) {
                    console.log('reqStatusResult', reqStatusResult);
                    RecLetterRequest.find({studentId: req.body.studentId, schoolId: req.body.schoolId, recommenderId: loggedInRecommenderId},
                    function(err, recLetterRequests) {
                      if(err) {
                        console.log('Error', err);
                        //res.json(err);
                      } else {
                        console.log(recLetterRequests);
                        recLetterRequests.forEach(element => {
                          element.letterStatus = 'Created';
                          element.save(function(err, changedLetterRequest) {
                            if(err) {
                              console.log(err);
                            } else {
                              console.log('Changed Request saved in mongoDB', changedLetterRequest);
                            }
                          });
                        });
                      }
                    });
                  })
                  .catch(function(error) {
                    console.log('Error in call:', error);
                  });
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
  });
}

export function deleteRecLetter (req, res) {
  console.log('Entering deleteRecLetter...id=' + req.param.id);
  RecLetter.remove({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
}




