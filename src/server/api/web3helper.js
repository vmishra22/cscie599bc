import letterOwnershipArtifact from '../../LetterContract/build/contracts/LetterOwnership.json'

const bs58 = require('bs58');
const IpfsAPI = require('ipfs-api');
const contract = require('truffle-contract');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const letterOwnershipContract = contract(letterOwnershipArtifact);
letterOwnershipContract.setProvider(provider);
export {bs58, IpfsAPI, contract, Web3, provider, letterOwnershipContract}
