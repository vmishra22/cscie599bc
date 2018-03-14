'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/recletters-dev'
  },

  // Seed database on startup
  seedDB: true,

  web3Url: 'http://localhost:7545'
};
