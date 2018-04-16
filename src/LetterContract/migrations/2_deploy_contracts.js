var ownable = artifacts.require("ownable");
var safemath = artifacts.require("safemath");
var stringutils = artifacts.require("stringutils");
var erc721 = artifacts.require("erc721");
var letterownership = artifacts.require("letterownership");
var letterfactory = artifacts.require("letterfactory");
var letterhelper = artifacts.require("letterhelper");
var letterrequest = artifacts.require("letterrequest");


module.exports = function(deployer) {
  deployer.deploy(stringutils);
  deployer.deploy(ownable);
  deployer.deploy(safemath);
  deployer.link(stringutils, [letterhelper, letterownership]);
  //deployer.deploy(erc721, {gas: 4612388});
  deployer.deploy(letterfactory);
  deployer.deploy(letterrequest);
  deployer.deploy(letterhelper);
  deployer.deploy(letterownership);
};


