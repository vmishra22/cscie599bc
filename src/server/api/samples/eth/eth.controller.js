/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import solc from 'solc'
import sleep from 'sleep'
import fs from 'fs'

export function getAccounts(req, res) {
  var web3 = req.app.get('web3');
  return web3.eth.getAccounts()
    .then(result => res.status(200).json(result));
}

export function getContractInfo(req, res) {
  var web3 = req.app.get('web3');
  const tranHash = "0x2e1da46a1b8583f92d958d63707a53ba620a68a92c38d7715e0b963ad46848a6";
  web3.eth.getTransactionReceipt(tranHash).then(console.log);
  return res.status(200).json("")
}

export function runSample(req, res) {
  var web3 = req.app.get('web3');

  //TODO: Read smart contract data, compile smart contract, upload smart contract to block chain,
  // query for contract, update state in contract

  //From here: https://www.ethereum.org/greeter
  //Will move this to a file or unit test or something...
  var contractString ="contract mortal {" + "\n" +
    "  /* Define variable owner of the type address */" + "\n" +
    "  address owner;" + "\n" +
    "" + "\n" +
    "  /* This function is executed at initialization and sets the owner of the contract */" + "\n" +
    "  function mortal() { owner = msg.sender; }" + "\n" +
    "" + "\n" +
    "  /* Function to recover the funds on the contract */" + "\n" +
    "  function kill() { if (msg.sender == owner) selfdestruct(owner); }" + "\n" +
    "}" + "\n" +
    "" + "\n" +
    "contract greeter is mortal {" + "\n" +
    "  /* Define variable greeting of the type string */" + "\n" +
    "  string greeting;" + "\n" +
    "" + "\n" +
    "  /* This runs when the contract is executed */" + "\n" +
    "  function greeter(string _greeting) public {" + "\n" +
    "      greeting = _greeting;" + "\n" +
    "  }" + "\n" +
    "" + "\n" +
    "  /* Main function */" + "\n" +
    "  function greet() constant returns (string) {" + "\n" +
    "      return greeting;" + "\n" +
    "  }" + "\n" +
    "}";

  const output = solc.compile(contractString, 1);
  const bytecode = output.contracts[':greeter'].bytecode;
  const abi = JSON.parse(output.contracts[':greeter'].interface);

  // Contract object
  let contract = new web3.eth.Contract(abi);

  return web3.eth.getAccounts().then(accounts => {
    // Deploy contract instance
    return contract.deploy({
      data: '0x' + bytecode,
      arguments: ["Hello World"]
    })
    .send({
        from: accounts[0],
        gas: 500000, // Must be below gas limit of 3141592 and above instrinsic gas usage
    })
    .on('transactionHash', function(transactionHash) {
      console.log('successfully got the transaction hash: ' + transactionHash)

      // Retrying every second to get the contract receipt,
      // workaround for bug in the API
      const retry = () => web3.eth.getTransactionReceipt(transactionHash)
        .then(r => res.status(200).json(r))
        .catch(e => {
          console.log("trying to get contract recepit again...")
          sleep.sleep(1);
          return retry();
        });

      return retry();
    }).on('receipt',  (receipt) => {
        console.log(receipt.contractAddress);
      })
    .catch(err => {
      // Swallowing this error: Error: Failed to check for transaction receipt: {}
      // Seems to be a web3 or geth bug:
      // https://ethereum.stackexchange.com/questions/42245/web3js-contract-deploy-never-get-receipt
      if(!err.toString().includes("Failed to check for transaction receipt")) {
        console.log(err);
      }
    });
  });
}


export function runAnotherSample(req, res) {
  var web3 = req.app.get('web3');

  //TODO: Read smart contract data, compile smart contract, upload smart contract to block chain,
  // query for contract, update state in contract

  //From here: https://www.ethereum.org/greeter
  //Will move this to a file or unit test or something...
  var newContractString = fs.readFileSync('LetterContract/mortal.sol', 'utf8');


  const output = solc.compile(newContractString, 1);
  //const bytecode = output.contracts[':greeter'].bytecode;
  const bytecode = output.contracts[':mortal'].bytecode;
  const abi = JSON.parse(output.contracts[':mortal'].interface);

  //const abi = JSON.parse(output)

  // Contract object
  let contract = new web3.eth.Contract(abi);
  return web3.eth.getAccounts().then(accounts => {
    // Deploy contract instance
    return contract.deploy({
       data: '0x' + bytecode,
      // arguments: ["Hello World"]
    })
      .send({
        from: accounts[0],
        gas: 500000, // Must be below gas limit of 3141592 and above instrinsic gas usage
      })
      .on('transactionHash', function(transactionHash) {
        console.log('successfully got the transaction hash: ' + transactionHash)

        // Retrying every second to get the contract receipt,
        // workaround for bug in the API
        const retry = () =>
          web3.eth.getTransactionReceipt(transactionHash)
          .then(r => res.status(200).json(r))
          .catch(e => {
            console.log("trying to get contract recepit again...")
            sleep.sleep(1);
            return retry();
          });

        return retry();
      }).on('receipt',  (receipt) => {
        console.log(receipt.contractAddress);
      })
      .catch(err => {
        // Swallowing this error: Error: Failed to check for transaction receipt: {}
        // Seems to be a web3 or geth bug:
        // https://ethereum.stackexchange.com/questions/42245/web3js-contract-deploy-never-get-receipt
        if(!err.toString().includes("Failed to check for transaction receipt")) {
          console.log(err);
        }
      });
  });
}

export function runContract(req, res) {
  var web3 = req.app.get('web3');

  //TODO: Read smart contract data, compile smart contract, upload smart contract to block chain,
  // query for contract, update state in contract

  //From here: https://www.ethereum.org/greeter
  //Will move this to a file or unit test or something...
  var newContractString = fs.readFileSync('LetterContract/mortal.sol', 'utf8');


  const output = solc.compile(newContractString, 1);
  //const bytecode = output.contracts[':greeter'].bytecode;
  const bytecode = output.contracts[':greeter'].bytecode;
  const abi = JSON.parse(output.contracts[':greeter'].interface);

  //const abi = JSON.parse(output)

  // Contract object
  let contract = new web3.eth.Contract(abi, '0x8ACEe021a27779d8E98B9650722676B850b25E11');

  return contract.methods.greet().call().then(console.log)
}





export function runLetterContract(req, res) {
  var web3 = req.app.get('web3');

  //TODO: Read smart contract data, compile smart contract, upload smart contract to block chain,
  // query for contract, update state in contract

  //From here: https://www.ethereum.org/greeter
  //Will move this to a file or unit test or something...
  var newContractString = fs.readFileSync('LetterContract/NotSoSimpleStorage.sol', 'utf8');


  const output = solc.compile(newContractString, 1);
  //const bytecode = output.contracts[':greeter'].bytecode;
  console.log(output)
  const bytecode = output.contracts[':NotSoSimpleStorage'].bytecode;
  const abi = JSON.parse(output.contracts[':NotSoSimpleStorage'].interface);

  //const abi = JSON.parse(output)

  // Contract object
  let contract = new web3.eth.Contract(abi);

  return web3.eth.getAccounts().then(accounts => {
    // Deploy contract instance
    return contract.deploy({
      data: '0x' + bytecode,
      arguments: ["get ipfs"]
    })
      .send({
        from: accounts[0],
        gas: 500000, // Must be below gas limit of 3141592 and above instrinsic gas usage
      })
      .on('transactionHash', function(transactionHash) {
        console.log('successfully got the transaction hash: ' + transactionHash)

        // Retrying every second to get the contract receipt,
        // workaround for bug in the API
        const retry = () => web3.eth.getTransactionReceipt(transactionHash)
          .then(r => res.status(200).json(r))
          .catch(e => {
            console.log("trying to get contract recepit again...")
            sleep.sleep(1);
            return retry();
          });

        return retry();
      }).on('receipt',  (receipt) => {
        console.log("receipt contract address", receipt.contractAddress);
      })
      .catch(err => {
        // Swallowing this error: Error: Failed to check for transaction receipt: {}
        // Seems to be a web3 or geth bug:
        // https://ethereum.stackexchange.com/questions/42245/web3js-contract-deploy-never-get-receipt
        if(!err.toString().includes("Failed to check for transaction receipt")) {
          console.log(err);
        }
      });
  });
 // return contract.methods.greet().call().then(console.log)
}

export function callStorageContract(req, res) {
  var web3 = req.app.get('web3');

  //TODO: Read smart contract data, compile smart contract, upload smart contract to block chain,
  // query for contract, update state in contract

  //From here: https://www.ethereum.org/greeter
  //Will move this to a file or unit test or something...
  var newContractString = fs.readFileSync('LetterContract/NotSoSimpleStorage.sol', 'utf8');


  const output = solc.compile(newContractString, 1);
  //const bytecode = output.contracts[':greeter'].bytecode;
  //console.log(output)
  const bytecode = output.contracts[':NotSoSimpleStorage'].bytecode;
  const abi = JSON.parse(output.contracts[':NotSoSimpleStorage'].interface);

  //const abi = JSON.parse(output)

  // Contract object
  let contract = new web3.eth.Contract(abi, '0x059e17cEb15EF8470B7184B858D356317518aAB3');
  console.log(contract)
  return contract.methods.get().call().then(console.log)
}

export function index(req, res) {
  var web3 = req.app.get('web3');
  return web3.eth.getAccounts().then(result => res.status(200).json(result))
}
