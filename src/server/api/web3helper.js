import letterOwnershipArtifact from '../../LetterContract/build/contracts/LetterOwnership.json'

const bs58 = require('bs58');
const contract = require('truffle-contract');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const letterOwnershipContract = contract(letterOwnershipArtifact);
letterOwnershipContract.setProvider(provider);

const IpfsAPI = require('ipfs-api');
const ipfsHost = 'localhost';
const ipfsAPIPort = '5001';
// IPFS connection setup
const ipfs = IpfsAPI(ipfsHost, ipfsAPIPort);

function ipfsHashToBytes32 (ipfsHash) {
  let h = bs58.decode(ipfsHash).toString('hex')
    .replace(/^1220/, '')
  if (h.length !== 64) {
    console.log('invalid ipfs format', ipfsHash, h)
    return null
  }
  return '0x' + h
}

function bytes32ToIPFSHash (hashHex) {
  //console.log('bytes32ToIPFSHash starts with hash_buffer', hash_hex.replace(/^0x/, ''));
  let buf = new Buffer(hashHex.replace(/^0x/, '1220'), 'hex')
  return bs58.encode(buf)
}



export {bs58, IpfsAPI, ipfs, contract, Web3, provider, letterOwnershipContract, ipfsHashToBytes32, bytes32ToIPFSHash}
