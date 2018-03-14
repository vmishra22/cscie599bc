#!/bin/bash

# Compiles and deploys a single Solidity smart contract,
#   using a running local geth node and connecting via IPC,
#   outputing the abi, bin, and transactionReceipts in JSON format.
#   
#   first argument: solidity contract
#   second argument: IPC path to running geth node (must be IPC for admin module)
#
#   output files (written to same directory):
#       <solidity-filename-without-extension>.abi
#       <solidity-filename-without-extension>.bin
#       <solidity-filename-without-extension>.transactionReceipt

# compile solidity file
solc --abi --bin -o . --overwrite $1

# get abi and binary from output json fles
abi=`cat ${1%.*}.abi`
bin=`cat ${1%.*}.bin`

# concatenate some javascript code to run on geth
str="abi = $abi
bin = \"0x$bin\"
contract = eth.contract(abi)
instance = contract.new({from:eth.accounts[0],data:bin,gas:1000000})
admin.sleep(5)
transactionReceipt = eth.getTransactionReceipt(instance.transactionHash)
output = JSON.stringify(transactionReceipt)
console.log(output)"

# execute the code via geth attached to a already running geth node, stdout to file
geth --exec "$str" attach ipc:$2 > ${1%.*}.transactionReceipt

# bug: geth console adds 'undefined' to output before exiting...
#   ... so this strips out everything past the 1st line
echo "`head -n 1 ${1%.*}.transactionReceipt`" > ${1%.*}.transactionReceipt