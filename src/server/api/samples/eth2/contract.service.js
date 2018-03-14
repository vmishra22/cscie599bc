'use strict';

import config from '../../../config/environment';
import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider(config.web3Url));
import deploy from './contract.json'
var info = {abi: deploy.abi, contractAddress: deploy.contractAddress}
var contract = new web3.eth.Contract(info.abi, info.contractAddress);

export function getContractData() {
    return new Promise(function(resolve, reject) {
    	// Do async job
        contract.get.call(function(error, result) {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

export function setContractData(number) {
    return new Promise(function(resolve, reject) {
    	// Do async job
        contract.set.sendTransaction(number,function(error, result) {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

export function getContractInfo() {
    return contract.options;
}