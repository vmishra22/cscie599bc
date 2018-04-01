var Letterownership = artifacts.require("./letterownership.sol");

contract('Letter', function(accounts) {
  it("should do letter creation", function() {
    var pdfFileHash = " QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF";
    var jsonFileHash = " QmU441mdGL3f2EpG9VqKVqYf3GzjzKwSTiN5ifdJGpz1sF";
    return Letterownership.deployed().then(function(instance) {
      return instance.createLetter('Reco Letter', '10', '10', '10', pdfFileHash, jsonFileHash, {
        from: accounts[2]
      })
    })
    .then(function(createdLetter) {
      var newLetterId = createdLetter.logs[0].args['letterId']['c'][0];
      assert.equal(newLetterId, 0, "First letter Id stored is not 0");
    });
  });
});
