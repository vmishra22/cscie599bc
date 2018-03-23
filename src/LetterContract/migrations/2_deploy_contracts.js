var ownable = artifacts.require("ownable");
var safemath = artifacts.require("safemath");
var erc721 = artifacts.require("erc721");
var letterownership = artifacts.require("letterownership");
var letterfactory = artifacts.require("letterfactory");
var letterhelper = artifacts.require("letterhelper");
var letterrequest = artifacts.require("letterrequest");


module.exports = function(deployer) {
  deployer.deploy(ownable);
  deployer.deploy(safemath);
  //deployer.deploy(erc721, {gas: 4612388});
  deployer.deploy(letterownership);
  deployer.deploy(letterfactory);
  deployer.deploy(letterhelper);
  deployer.deploy(letterrequest);
};


