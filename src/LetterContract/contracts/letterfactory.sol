pragma solidity ^0.4.21;

import "./ownable.sol";
import "./safemath.sol";

contract LetterFactory is Ownable {

    using SafeMath for uint256;

    event NewLetter(uint letterId, string studentId, string recommenderId, string schoolProgramId);

    struct Letter {
        string name;
        string studentId;   
        string recommenderId;  
        string schoolProgramId;   
        bytes32 pdfFileHash;   
        bytes32 jsonFileHash;  
    }

    Letter[] public letters;

    //To retrieve the owner address from a letter
    mapping (uint => address) public letterToOwner;  
    //To retrive the number of letters an owner holds
    mapping (address => uint) ownerLetterCount;  

    function _createLetter
    (
        string _name, 
        string _studentId, 
        string _recommenderId,
        string _schoolProgramId, 
        bytes32 _pdfFileHash,  
        bytes32 _jsonFileHash) internal 
    {
        uint letterId = letters.push(Letter(_name, _studentId, _recommenderId, _schoolProgramId, _pdfFileHash, _jsonFileHash)) - 1;
        letterToOwner[letterId] = msg.sender;
        ownerLetterCount[msg.sender]++;
        emit NewLetter(letterId, _studentId, _recommenderId, _schoolProgramId);
    }

    function createLetter
    (
        string _name, 
        string _studentId, 
        string _recommenderId,
        string _schoolProgramId, 
        bytes32 _pdfFileHash,  
        bytes32 _jsonFileHash) public 
    {
        _createLetter(_name, _studentId, _recommenderId, _schoolProgramId, _pdfFileHash, _jsonFileHash);
    }

}
