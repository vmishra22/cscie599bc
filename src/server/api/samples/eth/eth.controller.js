/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

import solc from 'solc';
import sleep from 'sleep';
import fs from 'fs';


var IpfsAPI = require('ipfs-api');

export function getAccounts(req, res) {
  var web3 = req.app.get('web3');
  return web3.eth.getAccounts()
    .then(result => res.status(200).json(result));
}

export function getContractInfo(req, res) {
  var web3 = req.app.get('web3');
  const tranHash = '0x2e1da46a1b8583f92d958d63707a53ba620a68a92c38d7715e0b963ad46848a6';
  web3.eth.getTransactionReceipt(tranHash).then(console.log);
  return res.status(200).json('');
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

  return contract.methods.greet().call()
          .then(console.log);
}

/*
  Function to load and compile contracts related to recommendation letter system.
*/
export function createAndDeployLetterContract(req, res) {
  var web3 = req.app.get('web3');

  //Load the Rec-Letter contract(This contract follows ERC721)
 // var letterContractBuffer = fs.readFileSync('LetterContract/letterownership.sol', 'utf8');
  var input = {
    'letterownership.sol': fs.readFileSync('LetterContract/letterownership.sol', 'utf8'),
    'letterfactory.sol': fs.readFileSync('LetterContract/letterfactory.sol', 'utf8'),
    'letterhelper.sol': fs.readFileSync('LetterContract/letterhelper.sol', 'utf8'),
    'ownable.sol': fs.readFileSync('LetterContract/ownable.sol', 'utf8'),
    'safemath.sol': fs.readFileSync('LetterContract/safemath.sol', 'utf8'),
    'erc721.sol': fs.readFileSync('LetterContract/erc721.sol', 'utf8')

  }; 
  //Compile this contract
  const output = solc.compile({sources: input}, 1);
  for(var contractName in output.contracts) {
    console.log(contractName + ': ' + output.contracts[contractName]);
  }
  //Retrieve 'abi' and 'bytecode' from the compiled contract

  const bytecode = output.contracts['letterownership.sol:LetterOwnership'].bytecode;
  const abi = JSON.parse(output.contracts['letterownership.sol:LetterOwnership'].interface);
  // const gasEstimate = web3.eth.estimateGas({data: bytecode});
  // console.log('gasEstimate: ', gasEstimate);
  
  // Create a Contract object from 'abi'
  let contract = new web3.eth.Contract(abi);


  // Ying: for contract deployment process, it only needs to happen once on the blockchain
  // The contract address will be unique universally, the account who called to the function in the contract address is the person
  // who initiated letter submission process


  return web3.eth.getAccounts()
    .then(accounts => {
      // Deploy contract instance
      return contract.deploy({
        data: '0x' + bytecode
      })
    .send({
      from: accounts[0],
      gas: 3000000, // Must be below gas limit of 3141592 and above instrinsic gas usage
    })
    .on('error', error => {
      console.log('Error on deploy: ', error);
    })
    .on('transactionHash', function(transactionHash) {
      console.log('successfully got the transaction hash: ' + transactionHash)

      // Retrying every second to get the contract receipt,
      // workaround for bug in the API
      const retry = () => web3.eth.getTransactionReceipt(transactionHash)
        .then(r => res.status(200).json(r))
        .catch(e => {
          console.log('trying to get contract recepit again...');
          sleep.sleep(1);
          return retry();
        });

      return retry();
    })
    .on('receipt', receipt => {
      console.log('receipt contract address', receipt.contractAddress);
    })
    .then(contractInstance => {
      //Lets do something useful with contract Instance:
      //1. Add the file to IPFS
      //TODO: Eventually the path URl for pdf file and json file would be probably from somewhere else.
      var letterPdfBuffer = fs.readFileSync('LetterContract/PdfRecoletter1.pdf');
      var letterjsonBuffer = fs.readFileSync('LetterContract/jsonRecoletter1.json');

      var ipfsHost = 'localhost',
        ipfsAPIPort = '5001',
        ipfsWebPort = '8080',
        web3Host = 'localhost',
        web3Port = '8000';

      // IPFS
      var ipfs = IpfsAPI(ipfsHost, ipfsAPIPort)
      ipfs.swarm.peers(function(err, response) {
        if (err) {
          console.error(err);
        } else {
          console.log("IPFS - connected to " + response.length + " peers");
        }
      });



      var filePaths = [
        {
          path: 'LetterContract/PdfRecoletter1.pdf', // The file path
          content: letterPdfBuffer
        },
        {
          path: 'LetterContract/jsonRecoletter1.json',
          content: letterjsonBuffer
        }
      ];

      var pdfFileHash = null;
      var jsonFileHash = null;
      var url = Buffer.from(fs.readFileSync('LetterContract/jsonRecoLetter1.json', 'utf8'), 'utf8');
      ipfs.add(url, function(err, result) {
        if(err) {
          console.error('Content submission error:', err);
          return false;
        } else if(result && result[0] && result[0].hash) {
          console.log('Content successfully stored. IPFS address:', result[0].hash);
          jsonFileHash = result[0].hash;
        } else {
          console.log(result);
          console.log(result[0]);
          console.log(result[0].Hash);
          console.error('Unresolved content submission error');
          return null;
        }
      });

      // ipfs.files.add(filePaths, (err, filesAdded) => {
      //   if(err || !res || filesAdded.length !== 2) return console.error('ipfs add error', err, res);
      //   const pdfFile = filesAdded[0];
      //   const jsonFile = filesAdded[1];
      //   console.log(pdfFile)
      //   console.log(jsonFile)

        //Create the letter using the contract method createLetter().
        //TODO: To figure out how to get student, recommender and school id to this point.
      contractInstance.createLetter("Sample Reco Letter", 10, 10, 10, pdfFileHash, jsonFileHash);

        //Listen to the new letter event
    var event = contractInstance.NewLetter(function(error, result) {
    if(error || !result) return console.error('Error while creating new letter in blockchain', error, result);
      console.log('Letter Index id in blockchain', result.letterId);
    });
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
  console.log(contract);
  return contract.methods.get().call()
          .then(console.log);
}

export function index(req, res) {
  var web3 = req.app.get('web3');
  return web3.eth.getAccounts().then(result => res.status(200).json(result))
}
