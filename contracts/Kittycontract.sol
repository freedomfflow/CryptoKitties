pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./SafeMath.sol";

contract Kittycontract is IERC721 {

    using SafeMath for uint256;

    // NOTE: since these are public, getters auto gen'd and we don't need to add our own getters
    //  to comply with interface
    string public constant name = "WolffKitties";
    string public constant symbol = "WK";

    // Cat Structure
    struct Kitty {
        uint256 geneSequence;
        uint64 birthTime;
        uint32 maternalId;
        uint32 paternalId;
        uint16 generation;
    }

    // Array of Cats
    Kitty[] kitties;

    // Cat id mapped to owner address
    mapping(uint256 => address) public kittyOwner;

    // Owner address mapped to quantity owned
    mapping(address => uint256) ownershipTokenCount;

    // How many kitties (721's) does an address own
    function balanceOf(address owner) external view returns (uint256 balance) {
        return ownershipTokenCount[owner];
    }

    // The total number of tokens in circulation
    function totalSupply() public view returns (uint) {
        return kitties.length;
    }

    // Returns the owner address of the token
    function ownerOf(uint256 _tokenId) external view returns (address) {
        // Token must exist
//        require(kittyOwner[_tokenId].exists,  'Token Id not found');
        // TODO need to debug above require, not working

        return kittyOwner[_tokenId];
    }

    // Transfer ownership of a token
    function transfer(address _to, uint256 _tokenId) external {
        // Can't transfer to the zero address
        require(_to != address(0), 'Not allowed to transfer to 0 address');
        // Can't transfer to the contract address
        require(_to != address(this), 'Not allowed to transfer to contract address');
        // Token must be owned by sender
        require(kittyOwner[_tokenId] == msg.sender, 'You must own the token to be able to transfer the token');

        _transfer(msg.sender, _to, _tokenId);
    }

    // Internal function to manage transfer and state
    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        // Add 1 to owners token count
        ownershipTokenCount[_to] = ownershipTokenCount[_to].add(1);

        // Update ownership array
        kittyOwner[_tokenId] = _to;

        // If not a 'mint' transfer, then decrement from owner token ownershipTokenCount
        if (_from != address(0)) {
            ownershipTokenCount[_from] = ownershipTokenCount[_from].sub(1);
        }

        // Emit transfer event
        emit Transfer(_from, _to, _tokenId);
    }
}
