'use strict';

// solidity compilation from local file
import * as fs from 'fs';
import * as solc from 'solc';
// Web3 Module
import * as Web3 from 'web3';
import * as config from './geth';
import * as net from 'net'; // Web3.IPCProvider

exports = module.exports = function Web3Wrapper () {

  var web3;
  var contracts = {};
  var accounts = {};
  
  // Configure Web3 Connection
  let nodeConfig = () => {

    let Ipc = ()=>{ 
      web3 = new Web3(config.web3.ProviderPath,net)}
    let Ws = ()=>{ 
      web3 = new Web3(config.web3.ProviderPath)}
    let Http = ()=>{ 
      web3 = new Web3(config.web3.ProviderPath)}

    var _connect;
    if (config.Web3.ProviderType == 'ipc') {
      _connect = Ipc}
    else if (config.Web3.ProviderType == 'ws') {
      _connect = Ws}
    else if (config.Web3.ProviderType == 'http') {
      _connect = Http}
    else {_connect = Http}
    var _disconnect =  ()=>{ web3 = null; }

    return {
      connect: ()=>_connect,
      disconnect: ()=>_disconnect
    }
  }

  // Configure Ethereum Accounts
  let accountConfig = ()=>{ 

    var addAccountWithKey = (key,type) => {
      return new Promise( (resolve,reject) => {
        let acct = web3.eth.accounts.privateKeyToAccount(key);
        if (acct && acct.address && (acct.address != '')) {
          key = null;
          acct.privateKey = null;
          acct.type = type;
          if (!accounts[acct.address]) {
            accounts[acct.address] = acct;
            resolve(accounts[acct.address]);
          }
        } 
        else {reject()}
      })
    }

    var getAllAccounts = () => {
      return this.accounts;
    }

    var loadAccounts = ()=>{ 
      return new Promise((resolve,reject)=>{
        Promise.all(
          config.Web3.accounts.map( val => { 
            addAccountWithKey(acct.key,acct.type)}
          )
          .then(
            resolve(
              getAllAccounts()
            )
          )
          .catch(err=>{
            reject(err)
          })
    )})}

    var getAccount = (addr)=>{
      return new Promise((resolve,reject)=>{
        for (acct in (accounts)) { 
          if (acct.address == addr) { 
            return accounts[addr];
          }
          return null;
        }
      })
    } 

    var removeAccount = (addr)=>{
      let acct = accounts.addr;
      if (acct) {
        acct.address = null;
        accounts.address = null;
        return true;
      }
      return false;
    }

  }}

  let transactionConfig = ()=>{ 

    var getGasBid = (transaction,callback) => {
      web3.eth.estimateGas(transaction,(err,gas)=>{
        if (err) {callback(err)}
        else {
          this.geth.getGasPrice((err2,gasPrice)=>{
            if (err2) {callback(err2)}
            else {
              callback(_,{gas:gas,gasPrice:price})
            }
          })
        }
      });
    }

  }

  let contractConfig = ()=>{ 

    var getContract = (name,callback) => {
      let contract = this.contract.name;
      if (contract) {callback(_,contract.clone());} 
      else {callback(new Error('No contract exists with name: '+name));}
    }

    var pullContract = (abi,address) => {
      let contract = this.geth.Contract(abi,address);
      // TODO: validate that the contract can be reached with those parameters
      this.contract = contract;
      return contract.clone();
    }

    var deploySolidityFile = function(name,file) {

      makePromise(fs.readFile(file,'utf-8'))

      .then(solIn=>{

        console.log(solIn);
        makePromise(solc.compile(solIn,1))})

      .then(solOut=>{

        console.log(solOut);
        let solJSON = JSON.parse(solOut);
        console.log(solJSON);
        let contracts = solJSON.contracts;

        contracts.map((contractName)=>{
          contractSpec = new web3.eth.Contract(contracts[contractName].interface);
          contractSpec.options = {
            jsonInterface: contracts[contractName].interface,
            data: "0x...",
            from: "0x...",
            gas: 10000,
            gasPrice: 100000}
          contractSpec.soliditySpec = contracts[contractName];
          contractSpec.deploy().send()
          .on('transactionHash')
          .on('receipt')
        })
      })
    }

  outputs['node'] = nodeConfig();
  
}

/*  _promise(doFunction,...withArgs)

    - Takes a function expecting an (err,res) callback 
      function and converts it to a Promise() object for 
      cleaner and (esp) easier-to-understand code.
    - Calls the resolve and reject functions using the res
      and err inputs to the callback.
    - Feel free to modify this to resolve without inputs,
      or ignore the inputs when handling the Promise.     */

_promise=(f,...a)=>{return new Promise((f1,f2)=>{f(a,(e,r)=>{if(e){f2(e)}else{f1(r)}})})}