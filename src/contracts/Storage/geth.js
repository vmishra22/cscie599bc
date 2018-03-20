var output = {"contracts":{"Storage.sol:Storage":{"abi":"[{\"constant\":false,\"inputs\":[{\"name\":\"data\",\"type\":\"uint256\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]","bin":"6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a7230582047e24b2fa661aba2f07f0065b536a950a754172b2d21382ac26e5e2f388de7f70029"}},"version":"0.4.21+commit.dfe3193c.Darwin.appleclang"}
var abi = JSON.parse(output.contracts['Storage.sol:Storage'].abi)
var contract = eth.contract(abi)
var bin = '0x' + output.contracts['Storage.sol:Storage'].bin
var instance = contract.new({from:eth.accounts[0],data:bin,gas:1000000})
admin.sleep(5)
var transactionReceipt = eth.getTransactionReceipt(instance.transactionHash)
var result = {}
result.abi = abi
result.bin = bin
result.transactionReceipt = transactionReceipt
result
