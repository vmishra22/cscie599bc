module.exports = {
    port: 8555,
    norpc: true,
    testrpcOptions: '-a 10 -p 8555 -g 1 -l 0xfffffffffff',
    dir: './/LetterContract',
    testCommand: ' truffle test --network coverage',
    skipFiles: ['erc721.sol','safemath.sol', 'stringutils.sol','ownable.sol']
};