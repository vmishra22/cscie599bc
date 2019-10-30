# cscie599bc
Blockchain project

1. Make sure you have geth or ganache running, with the same url and port set up in src/LetterContract/truffle.js
2. run `./src/start.sh` to start the service


Getting Started
Prerequisites
Git
Node.js and npm Node >= 4.x.x, npm >= 2.x.x
Gulp (npm install --global gulp)
MongoDB - Keep a running daemon with mongod
Ethereum - Keep a runnning geth process open
[Truffle] (https://github.com/trufflesuite/truffle) - Use truffle as the Ethererum development framework
Developing
cd src; ./start.sh
####Alternatively, step by Step

Run npm install to install server dependencies.

Run npm install -g truffle to install truffle globally

Enter \Lettercontract remove the files in \build folder, run truffle compile, truffle migrate

Run mongod in a separate shell to keep an instance of the MongoDB Daemon running

Run ipfs daemon to have ipfs node running

Run gulp serve to start the development server. It should automatically open the client in your browser when ready.

Build & development
Run gulp build for building and gulp serve for preview.

Testing
Running npm test will run the unit tests with karma.

Debug
Port in use error lsof -n -i:3000 | grep LISTEN | awk '{ print $2 }' | uniq | xargs kill -9

solidity compilation error, update solidity version in truffle cd /usr/local/lib/node_modules/truffle run npm install solc@0.4.21
