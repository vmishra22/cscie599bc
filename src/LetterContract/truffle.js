
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777', // Match any network id
      gas: 3500000
    }
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
