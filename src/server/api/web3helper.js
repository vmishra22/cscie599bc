import letterOwnershipArtifact from '../../LetterContract/build/contracts/LetterOwnership.json';

import { Connect, SimpleSigner } from 'uport-connect';

const bs58 = require('bs58');
const contract = require('truffle-contract');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const letterOwnershipContract = contract(letterOwnershipArtifact);
letterOwnershipContract.setProvider(provider);

const IpfsAPI = require('ipfs-api');
// Ying, You can setup a EC@ instance to run the ipfs node, this is the public ip of the ec2
// ssh to the ec2 and run:
// ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
// change 127.0.0.1 to ec2's private ip address

const ipfsHost = '52.14.10.169'; //'127.0.0.1'
const ipfsAPIPort = '5001';
// IPFS connection setup
const ipfs = IpfsAPI(ipfsHost, ipfsAPIPort);

function ipfsHashToBytes32(ipfsHash) {
  console.log('Entering ipfsHashToBytes32', ipfsHash);
  let h = bs58.decode(ipfsHash).toString('hex')
    .replace(/^1220/, '');
  if(h.length !== 64) {
    console.log('invalid ipfs format', ipfsHash, h);
    return null;
  }
  console.log('Exit ipfsHashToBytes32', '0x' + h);
  return '0x' + h;
}

function bytes32ToIPFSHash(hashHex) {
  console.log('Entering bytes32ToIPFSHash', hashHex);
  //console.log('bytes32ToIPFSHash starts with hash_buffer', hash_hex.replace(/^0x/, ''));
  let buf = new Buffer(hashHex.replace(/^0x/, '1220'), 'hex');
  let encodedBuffer = bs58.encode(buf);
  console.log('Exit bytes32ToIPFSHash', encodedBuffer);
  return encodedBuffer;
}


const uport = new Connect('uPort Demo', {
  clientId: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
  signer: SimpleSigner('c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2')
});

const uportWeb3 = uport.getWeb3();


export { bs58, IpfsAPI, ipfs, contract, Web3, provider, letterOwnershipContract, ipfsHashToBytes32, bytes32ToIPFSHash, uportWeb3, uport};
