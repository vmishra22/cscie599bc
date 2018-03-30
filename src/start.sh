# enter truffle folder to run truffle commands
cd LetterContract;
# deleted previously compiled files
rm -rf /build/*;
# compile contracts
truffle compile;
# deploy contracts, make sure you connected to geth or ganache
truffle migrate;
# start ipfs
#ipfs daemon &
# start mongod
mongod &
# start web server
gulp serve
