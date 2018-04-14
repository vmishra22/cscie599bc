
var letterOwnershipContract = artifacts.require("./letterownership.sol");
let bs58 = require('bs58');

function ipfsHashToBytes32(ipfsHash) {
  let h = bs58.decode(ipfsHash).toString('hex')
    .replace(/^1220/, '');
  if(h.length !== 64) {
    console.log('invalid ipfs format', ipfsHash, h);
    return null;
  }
  return '0x' + h;
}

function bytes32ToIPFSHash(hashHex) {
  //console.log('bytes32ToIPFSHash starts with hash_buffer', hash_hex.replace(/^0x/, ''));
  let buf = new Buffer(hashHex.replace(/^0x/, '1220'), 'hex');
  let encodedBuffer = bs58.encode(buf);
  return encodedBuffer;
}

contract('Letter', function(accounts) {
  it("should do letter creation", function() {
    let contractInstance;
    let newLetterId;
    let newLetterRequestId;
    var pdfFileHash = ipfsHashToBytes32("QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF");
    var jsonFileHash = ipfsHashToBytes32("QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF");
    return letterOwnershipContract.deployed().then(function(instance) {
      contractInstance = instance;
      return contractInstance.createRequest('10', '10', '10', 0, {
        from: accounts[2]
      });
    })
    .then(function(createRequestResult) {
      newLetterRequestId = createRequestResult.logs[0].args['requestId']['c'][0];
      assert.equal(newLetterRequestId, 0, "First request Id stored is not 0");
      let newLetterRequestStatus = createRequestResult.logs[0].args['status']['c'][0];
      let newLetterStatus = newLetterRequestStatus == '0' ? 'Pending' : 'Created';
      assert.equal(newLetterStatus, 'Pending', "First request status stored is not Pending");
      return contractInstance.createLetter('Recommendation Letter0', '10', '10', '10', pdfFileHash, jsonFileHash, {
        from: accounts[2]
      });
    })
    .then(function(createdLetter) {
      newLetterId = createdLetter.logs[0].args['letterId']['c'][0];
      assert.equal(newLetterId, 0, "First letter Id stored is not 0");
      return contractInstance.changeRequestStatus(newLetterId, 1, {
        from: accounts[2]
      });
    })
    .then(function() {
      return contractInstance.changeName(0, "Recommendation Letter1", {
        from: accounts[2]
      });
    })
    .then(function() {
      return contractInstance.changeSchoolProgram(0, "10", {
        from: accounts[2]
      });
    })
    .then(function() {
      return contractInstance.transfer(accounts[1], 0, {
        from: accounts[2]
      });
    })
    .then(function() {
      return contractInstance.getLettersByOwner(accounts[2]);
    })
    .then(function(lettersOwnedBy) {
      assert.equal(lettersOwnedBy.length, 0, "No letter owned by this account[2]");
    })
    .then(function() {
      return contractInstance.transfer(accounts[2], 0, {
        from: accounts[1]
      });
    })
    .then(function() {
      return contractInstance.approve(accounts[1], 0, {
        from: accounts[2]
      });
    })
    .then(function(approvalData) {
      let ownerAddress =  accounts[2];
      assert.equal(ownerAddress, approvalData.logs[0].args._owner, "Address mismatch");
      return contractInstance.takeOwnership(0, {
        from: accounts[1]
      });
    })
    .then(function(transferData) {
      return contractInstance.getRequestStatus(newLetterRequestId);
    })
    .then(function(statusResult) {
      assert.equal(statusResult['c'][0], 1, "Request status is completed");
      return contractInstance.getLetterRequestsByStudentId('10');
    })
    .then(function(studentRequests) {
      assert.equal(studentRequests.length, 1, "Only one request from the student so far.");
      return contractInstance.getLetterRequestsByRecommenderId('10');
    })
    .then(function(recommenderRequests) {
      assert.equal(recommenderRequests.length, 1, "Only one request for the recommender so far.");
      return contractInstance.getLettersByStudentAndSchoolId('10', '10');
    })
    .then(function(letters) {
      assert.equal(letters.length, 1, "Only one letter stored");
      let letterId = letters[0];
      assert.equal(letterId, 0, "letter Id stored is not 0");
      return contractInstance.getLetterIPFSLinksByLetterId(letterId);
    })
    .then(function(ipfsLettersArray) {
      assert.equal(ipfsLettersArray.length, 2, "Two documents per recommendation");
      const pdfFileIPFSHash = bytes32ToIPFSHash(ipfsLettersArray[0]);
      const questionsJsonHash = bytes32ToIPFSHash(ipfsLettersArray[1]);
      assert.equal(pdfFileIPFSHash, "QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF", "IPFS hash is incorrect");
      assert.equal(questionsJsonHash, "QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF", "IPFS hash is incorrect");
    })
    .then(function() {
      return contractInstance.getLettersByOwner(accounts[2]);
    })
    .then(function(lettersOwnedBy) {
      assert.equal(lettersOwnedBy.length, 1, "One letter owned by this account");
    })
    
    ;
  });
});
