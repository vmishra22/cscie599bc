pragma solidity ^0.4.21;

import "./letterhelper.sol";
import "./erc721.sol";
import "./safemath.sol";

contract LetterOwnership is LetterHelper, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) letterApprovals;

  function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerLetterCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return letterToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerLetterCount[_to] = ownerLetterCount[_to].add(1);
    ownerLetterCount[msg.sender] = ownerLetterCount[msg.sender].sub(1);
    letterToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    letterApprovals[_tokenId] = _to;
    emit Approval(msg.sender, _to, _tokenId);
  }

  function takeOwnership(uint256 _tokenId) public {
    require(letterApprovals[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }
}
