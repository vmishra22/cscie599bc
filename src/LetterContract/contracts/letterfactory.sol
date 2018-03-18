pragma solidity ^0.4.21;

import "./ownable.sol";
import "./safemath.sol";

contract LetterFactory is Ownable {

  using SafeMath for uint256;

  event NewLetter(uint letterId, uint studentId, 
                  uint recommenderId, uint schoolProgramId);

  struct Letter {
    string name;
    uint studentId;   //maybe a uportId or mongodbId?
    uint recommenderId;   //maybe a uportId or mongodbId?
    uint schoolProgramId;   //maybe a uportId or mongodbId?
    bytes32 pdfFileHash;   //Pdf file ipfs hash
    bytes32 jsonFileHash;  //File of the mandatory questions ipfs hash
  }

  Letter[] public letters;

  //To retrieve the owner address from a letter
  mapping (uint => address) public letterToOwner;  
  //To retrive the number of letters an owner holds
  mapping (address => uint) ownerLetterCount;  

  function _createLetter(string _name, 
                        uint _studentId, 
                        uint _recommenderId,
                        uint _schoolProgramId, 
                        bytes32 _pdfFileHash,  
                        bytes32 _jsonFileHash) internal 
  {
    uint letterId = letters.push(Letter(_name, _studentId, _recommenderId, _schoolProgramId, _pdfFileHash, _jsonFileHash)) - 1;
    letterToOwner[letterId] = msg.sender;
    ownerLetterCount[msg.sender]++;
    emit NewLetter(letterId, _studentId, _recommenderId, _schoolProgramId);
  }

  function createLetter(string _name, 
                        uint _studentId, 
                        uint _recommenderId,
                        uint _schoolProgramId, 
                        bytes32 _pdfFileHash,  
                        bytes32 _jsonFileHash) public 
  {
    _createLetter(_name, _studentId, _recommenderId, _schoolProgramId,
                  _pdfFileHash, _jsonFileHash);
  }

}
