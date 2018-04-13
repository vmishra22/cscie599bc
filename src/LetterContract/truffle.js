
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777', // Match any network id
      gas: 3500000
    },
    coverage: { host: "127.0.0.1", network_id: "*", port: 8555, gas: 0xfffffffffff, gasPrice: 0x01 }
  },
  rpc: {
        host: 'localhost',
        gas: 4712388,
        port: 7545
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },
    mocha: {
        useColors: true
    }
};
