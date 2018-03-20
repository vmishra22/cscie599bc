var Letterownership = artifacts.require("./letterownership.sol");

contract('Letter', async function(accounts) {
  it("should do letter", function() {
    return Letterownership.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "10000 wasn't in the first account");
    });
  });
});
