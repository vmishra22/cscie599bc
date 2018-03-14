/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

 'use strict';

export function index(req, res) {
  var web3 = req.app.get('web3');
  var info = {};
  info.api = web3.version.api;
  info.node = web3.version.node;
  info.network = web3.version.network;
  info.ethereum = web3.version.ethereum;
  info.whisper = web3.version.whisper;
  //info.isConnected = web3.isConnected();
  info.currentProvider = web3.currentProvider;
  //info.listening = web3.net.listening;
  //info.net.peerCount = web3.net.peerCount;
  info.defaultAccount = web3.eth.defaultAccount;
  //info.accounts = web3.eth.accounts;
  info.defaultBlock = web3.eth.defaultBlock;
  info.blockNumber = web3.eth.blockNumber;
  info.syncing = web3.eth.syncing;
  info.coinbase = web3.eth.coinbase;
  info.hashrate = web3.eth.hashrate;
  info.gasPrice = web3.eth.gasPrice;
  console.log(info);
  return res.status(200).send(info);
}