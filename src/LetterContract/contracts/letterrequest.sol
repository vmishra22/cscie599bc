pragma solidity ^0.4.21;

import "./ownable.sol";
import "./safemath.sol";

contract LetterRequest {
    using SafeMath for uint256;

    event NewRequest(uint requestId, string studentId,  string recommenderId, string schoolProgramId, State status);
    enum State { Pending, Created}

    struct Request{
        string studentId;   
        string recommenderId;
        string schoolProgramId; 
        State status;
    }

    Request[] requests;

    function _createRequest
    (
        string _studentId,
        string _recommenderId,
        string _schoolProgramId, 
        State _status) internal 
    {
        uint requestId = requests.push(Request(_studentId, _recommenderId, _schoolProgramId, _status)) - 1;
        emit NewRequest(requestId, _studentId, _recommenderId, _schoolProgramId, _status);
    }

    function createRequest
    ( 
        string _studentId, 
        string _recommenderId,
        string _schoolProgramId, 
        State _status) public 
    {
        _createRequest(_studentId, _recommenderId, _schoolProgramId, _status);
    }
}
