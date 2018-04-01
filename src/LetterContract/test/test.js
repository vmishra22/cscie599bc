
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
    var pdfFileHash = ipfsHashToBytes32("QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF");
    var jsonFileHash = ipfsHashToBytes32("QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF");
    return letterOwnershipContract.deployed().then(function(instance) {
      contractInstance = instance;
      return contractInstance.createLetter('Reco Letter', '10', '10', '10', pdfFileHash, jsonFileHash, {
        from: accounts[2]
      })
    })
    .then(function(createdLetter) {
      newLetterId = createdLetter.logs[0].args['letterId']['c'][0];
      assert.equal(newLetterId, 0, "First letter Id stored is not 0");
      return contractInstance.getLettersByStudentAndSchoolId('10', '10');
    })
    .then(function(letters){
      assert.equal(letters.length, 1, "Only one letter stored");
      letterId = letters[0];
      assert.equal(letterId, 0, "letter Id stored is not 0");
      return contractInstance.getLetterIPFSLinksByLetterId(letterId);
    })
    .then(function(ipfsLettersArray){
      assert.equal(ipfsLettersArray.length, 2, "Two documents per recommendation");
      const pdfFileIPFSHash = bytes32ToIPFSHash(ipfsLettersArray[0]);
      const questionsJsonHash = bytes32ToIPFSHash(ipfsLettersArray[1]);
      assert.equal(pdfFileIPFSHash, "QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF", "IPFS hash is incorrect");
      assert.equal(questionsJsonHash, "QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF", "IPFS hash is incorrect");
    });
  });
});
