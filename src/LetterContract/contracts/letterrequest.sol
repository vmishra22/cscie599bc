pragma solidity ^0.4.21;

import "./letterhelper.sol";

contract LetterRequest is LetterHelper {
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

    function _createRequest(uint _studentId, 
                                    uint _recommenderId,
                                    uint _schoolProgramId, 
                                    State _status) internal 
    {
        uint requestId = requests.push(Request(_studentId, _recommenderId, _schoolProgramId, _status)) - 1;
        emit NewRequest(requestId, _studentId, _recommenderId, _schoolProgramId, _status);
    }

    function createRequest( uint _studentId, 
                            uint _recommenderId,
                            uint _schoolProgramId, 
                            State _status) public 
    {
    _createRequest( _studentId, _recommenderId, _schoolProgramId, _status);
    }

    function changeStatus(uint _letterId, uint _status) external{
        require(_letterId >=0 && _letterId < requests.length);
        require(_status == 0 || _status == 1);
        if(_status == 0) requests[_letterId].status = State.Pending;
        else requests[_letterId].status = State.Created;
    }
}
