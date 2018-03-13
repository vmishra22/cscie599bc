/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import solc from 'solc'
import sleep from 'sleep'

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

    const deployContract = contract.deploy({
      data: '0x' + bytecode,
      arguments: ["Hello World"]
    })
    .send({
        from: accounts[0],
        gas: 500000, // Must be below gas limit of 3141592 and above instrinsic gas usage
    });

    const transactionReceipt = deployContract
    .on('transactionHash', function(transactionHash) {
      console.log('successfully got the transaction hash: ' + transactionHash)

      // Retrying every second to get the contract receipt,
      // workaround for bug in the API
      const retry = () => web3.eth.getTransactionReceipt(transactionHash)
        .then(r => r)
        .catch(e => {
          console.log("Couldn't get contract receipt, trying again...");
          sleep.sleep(30);
          return retry();
        });

      return retry();
    });

    return transactionReceipt.then(receipt => {
      console.log("The contract's address is: " + receipt._address);

      var contractInstance = new web3.eth.Contract(abi, receipt._address);
      if(contractInstance) {
        console.log("Successfully got the contract instance.")
      }

      return res.status(200).json(contractInstance);
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

export function index(req, res) {
  var web3 = req.app.get('web3');
  return web3.eth.getAccounts().then(result => res.status(200).json(result))
}
