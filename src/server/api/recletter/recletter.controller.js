/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict'

import RecLetter from '../../model/recletters';

const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const contract = require('truffle-contract');
import letterOwnershipArtifact from '../../../LetterContract/build/contracts/LetterOwnership.json';

var letterOwnershipContract = contract(letterOwnershipArtifact);
letterOwnershipContract.setProvider(provider);
var letterOwnership;

export function getRecLetters(req, res) {
  console.log('Entering getRecLetters()..');
  RecLetter.find(function(err, recLetters) {
    res.json(recLetters);
  });

  // create letter in smart contract
  // TODO: this is for demontration purpose, will move this to createRecLetter()
  letterOwnershipContract.deployed().then(function(instance) {
    var web3 = req.app.get('web3');
    letterOwnership = instance;
    var accounts = web3.eth.accounts;
    var letterName = 'Sample Reco Letter';
    var pdfFileHash = null;
    var jsonFileHash = null;
    
    return letterOwnership.createLetter(letterName, 10, 10, 10, pdfFileHash, jsonFileHash, {
      from: accounts[0],
      gas: 3000000
    });
  })
  .then(function(res1) {
    console.log(res1);
  })
  .catch(function(e) {
    console.log(e);
  });
}

export function getRecLetter (req, res) {
  console.log('Entering getRecLetter()..')
  RecLetter.find({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err)
    }
    else {
      res.json(result)
    }
  })
}

export function createRecLetter(req, res) {
  console.log('Entering createRecLetter()..');
  console.log(req.body);

  var loggedInRecommenderId = '' //get logged in user id

  let newRecLetter = new RecLetter({
    studentId: req.body.studentId,
    recommenderId: loggedInRecommenderId,
    schoolId: req.body.schoolId,
    programName: req.body.programName,
    submissionDate: new Date(),
    recLetterContents: req.body.recLetterContents,
    candidateQuestions: req.body.candidateQuestions
  })

  newRecLetter.save(function (err, recLetter) {
    if (err) {
      res.json(err)
    }
    else {
      res.json(recLetter)
    }
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


