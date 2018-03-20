'use strict';

import * as gethNode from 'gethNode';

export function contractMethodCall(req,res) {
  GethManager.call()
  .then(function(result) {
    res.status(200).send(result);})
  .catch(function(err) {
    console.log(err);
    res.status(500).send(err);});
}

export function contractMethodSend(req,res) {
  var data = req.body.data;
  GethManager.send(data)
  .then(result => {
    res.status(200).send(result)})
  .catch(error => {
    console.log(error);
    res.status(500).send(error);})
}

export function listContracts(req, res) {
  res.status(200).send(GethManager.getContracts()); 
}

export function getContract(req,res) {

}

export function deployContract(req, res) {
  GethManager.deployContract(
    'server/api/samples/eth2/Storage.sol',
    ':Storage',
    onFail,
    onSucceed);
}