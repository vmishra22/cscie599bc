pragma solidity ^0.4.21;

import "./letterfactory.sol";

contract LetterHelper is LetterFactory {

  modifier onlyOwnerOf(uint _letterId) {
    require(msg.sender == letterToOwner[_letterId]);
    _;
  }

  function withdraw() external onlyOwner {
    address contractAddress = this;
    owner.transfer(contractAddress.balance);
  }

  function changeName(uint _letterId, string _newName) 
                      external onlyOwnerOf(_letterId) {
    letters[_letterId].name = _newName;
  }

  function changeSchoolProgram(uint _letterId, uint _newProgramId) 
                      external onlyOwnerOf(_letterId) {
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

}
