pragma solidity ^0.4.21;

import "./ownable.sol";
import "./safemath.sol";

contract LetterRequest {
    using SafeMath for uint256;

    event NewRequest(uint requestId, uint studentId,  uint recommenderId, uint schoolProgramId, State status);
    enum State { Pending, Created}

    struct Request{
        uint studentId;   
        uint recommenderId;
        uint schoolProgramId; 
        State status;
    }

    Request[] requests;

    function _createRequest
    (
        uint _studentId,
        uint _recommenderId,
        uint _schoolProgramId, 
        State _status) internal 
    {
        uint requestId = requests.push(Request(_studentId, _recommenderId, _schoolProgramId, _status)) - 1;
        emit NewRequest(requestId, _studentId, _recommenderId, _schoolProgramId, _status);
    }

    function createRequest
    ( 
        uint _studentId, 
        uint _recommenderId,
        uint _schoolProgramId, 
        State _status) public 
    {
        _createRequest(_studentId, _recommenderId, _schoolProgramId, _status);
    }
}
