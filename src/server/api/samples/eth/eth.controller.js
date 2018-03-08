/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import solc from 'solc'

export function getAccounts(req, res) {
  var web3 = req.app.get('web3');
  return web3.eth.getAccounts()
    .then(result => res.status(200).json(result));
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

  // let source = fs.readFileSync('nameContract.sol', 'utf8');
  // let compiledContract = solc.compile(source, 1);
  // let abi = compiledContract.contracts['nameContract'].interface;
  // let bytecode = compiledContract.contracts['nameContract'].bytecode;
  // let gasEstimate = web3.eth.estimateGas({data: bytecode});
  // let MyContract = web3.eth.contract(JSON.parse(abi));

  // Contract object
  let contract = new web3.eth.Contract(abi);
  return res.status(200).json(contract);

// Deploy contract instance
  // const contractInstance = contract.new({
  //     data: '0x' + bytecode,
  //     from: web3.eth.coinbase,
  //     gas: 90000*2
  // }, (err, res) => {
  //     if (err) {
  //         console.log(err);
  //         return;
  //     }

  //     // Log the tx, you can explore status with eth.getTransaction()
  //     console.log("The transaction went through: " + res.transactionHash);

  //     // If we have an address property, the contract was deployed
  //     if (res.address) {
  //         console.log('Contract address: ' + res.address);
  //         // Let's test the deployed contract
  //         testContract(res.address);

  //         return res.status(200).json(res);
  //     }
  // });
}

export function index(req, res) {
  var web3 = req.app.get('web3');
  return web3.eth.getAccounts().then(result => res.status(200).json(result))
}
