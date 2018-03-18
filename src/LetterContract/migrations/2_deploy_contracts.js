var ownable = artifacts.require("./ownable.sol");
var safemath = artifacts.require("./safemath.sol");
var erc721 = artifacts.require("./erc721.sol");
var letterownership = artifacts.require("./letterownership.sol");
var letterfactory = artifacts.require("./letterfactory.sol");
var letterhelper = artifacts.require("./letterhelper.sol");


module.exports = function(deployer) {
  deployer.deploy(ownable);
  deployer.deploy(safemath);
  //deployer.deploy(erc721);
  deployer.deploy(letterownership);
  deployer.deploy(letterfactory);
  deployer.deploy(letterhelper);
};


