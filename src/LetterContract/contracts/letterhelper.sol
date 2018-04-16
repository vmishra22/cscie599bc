pragma solidity ^0.4.21;

import "./letterfactory.sol";
import "./letterrequest.sol";
import "./StringUtils.sol";

contract LetterHelper is LetterFactory, LetterRequest {

    modifier onlyOwnerOf(uint _letterId) {
        require(msg.sender == letterToOwner[_letterId]);
        _;
    }

    function changeName(uint _letterId, string _newName) 
                        external onlyOwnerOf(_letterId) {
        require(_letterId >= 0 && _letterId < letters.length);
        letters[_letterId].name = _newName;
    }

    function changeSchoolProgram(uint _letterId, string _newProgramId) 
                        external onlyOwnerOf(_letterId) {
        require(_letterId >= 0 && _letterId < letters.length);
        letters[_letterId].schoolProgramId = _newProgramId;
    }

    //Get all the letter's ids owned by an owner, function is "view" to avoid
    //paying the gas. 
    function getLettersByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](ownerLetterCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < letters.length; i++) {
            if (letterToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getLettersByStudentAndSchoolId(string _studentId, string _ProgramId) external view returns(uint[]) {
        uint[] memory result = new uint[]( letters.length);
        uint counter = 0;
        for (uint i = 0; i < letters.length; i++) {
            if (keccak256(letters[i].studentId) == keccak256(_studentId) && keccak256(letters[i].schoolProgramId) == keccak256(_ProgramId) ) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getLetterIPFSLinksByLetterId(uint _letterId) external view returns(bytes32[]) {
        require(_letterId >= 0 && _letterId < letters.length);
        bytes32[] memory result = new bytes32[](2);
        result[0] = letters[_letterId].pdfFileHash;
        result[1] = letters[_letterId].jsonFileHash;
        return result;
    }

    function changeRequestStatus(uint _letterId, uint _status) external{
        require(_letterId >= 0 && _letterId < letters.length);
        require(_status == 0 || _status == 1);
        //find the corresponding request of the letter:
        string memory letterStudentId = letters[_letterId].studentId;
        string memory letterRecommenderId = letters[_letterId].recommenderId;
        string memory letterProgramId = letters[_letterId].schoolProgramId;
        for (uint i = 0; i < requests.length; i++) {
            if ( (keccak256(requests[i].studentId) == keccak256(letterStudentId)) && 
            (keccak256(requests[i].recommenderId) == keccak256(letterRecommenderId)) &&
            (keccak256(requests[i].schoolProgramId) == keccak256(letterProgramId))) {
                if(_status == 1) requests[i].status = State.Created;
                break;
            }
        }
    }

    function getRequestStatus(uint _requestId) external view returns(uint) {
        require(_requestId >= 0);
        uint status = 0;
        if(requests[_requestId].status == State.Created)
            status = 1;
        return status;
    }

    function getLetterRequestsByStudentId(string _studentId) public view returns(uint[], uint){
        uint[] memory result = new uint[]( requests.length);
        uint counter = 0;
        for (uint i = 0; i < requests.length; i++) {
            if(StringUtils.equal(requests[i].studentId, _studentId)) {
                result[counter] = i;
                counter++;
            }
        }
        return (result, counter);
    }

    function getLetterRequestsByRecommenderId(string _recommenderId) public view returns(uint[], uint){
        uint256[] memory result1 = new uint[]( requests.length);
        uint counter = 0;
        for (uint icntr = 0; icntr < requests.length; icntr++) {
            if (StringUtils.equal(_recommenderId,requests[icntr].recommenderId)){
                result1[counter] = icntr;
                counter++;
           }
        }
        return (result1, counter);
    }

}
