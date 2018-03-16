/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import seedDatabaseIfNeeded from './config/seed';
import Web3 from 'web3';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, {useMongoClient: true});
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
var app = express();
var server = http.createServer(app);
server.timeout = 1200000;
require('./config/express').default(app);
require('./routes').default(app);

// Create Ethereum connection
//Vinay: HttpProvider is deprecated now needs to use websocket or IPC to enable subscription events.
var web3 = new Web3(new Web3.providers.HttpProvider(config.web3Url));
app.set('web3', web3);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

seedDatabaseIfNeeded();
setImmediate(startServer);

// Expose app
exports = module.exports = app;
