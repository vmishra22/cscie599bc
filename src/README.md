# rec-letters

[![Build Status](https://travis-ci.org/vmishra22/cscie599bc.svg?branch=master)](https://travis-ci.org/vmishra22/cscie599bc)

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [Ethereum](https://www.ethereum.org/) - Keep a runnning geth process open
- [Truffle] (https://github.com/trufflesuite/truffle) - Use truffle as the Ethererum development framework

### Developing
#### `cd src; ./start.sh`

####Alternatively, step by Step

1. Run `npm install` to install server dependencies.

2. Run `npm install -g truffle` to install truffle globally

3. Enter `\Lettercontract` remove the files in `\build` folder, run `truffle compile`, `truffle migrate` 

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `ipfs daemon` to have ipfs node running

5. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Debug
1. Port in use error 
`lsof -n -i:3000 | grep LISTEN | awk '{ print $2 }' | uniq | xargs kill -9`

2. solidity compilation error, update solidity version in truffle
`cd /usr/local/lib/node_modules/truffle`
`run npm install solc@0.4.21`


