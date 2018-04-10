# enter truffle folder to run truffle commands
cd LetterContract;
# deleted previously compiled files
rm -rf build;
# compile contracts
truffle compile;
# deploy contracts, make sure you connected to geth or ganache
truffle migrate;
# Go back to src
cd ..;
# start ipfs
#ipfs daemon &
# start mongod
mongod &
mongo recletters-dev --eval "db.recletterrequests; db.recletterrequests.deleteMany({}); db.recletters.deleteMany({}); quit();"
# start web server
gulp serve
