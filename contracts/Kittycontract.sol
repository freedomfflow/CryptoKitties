pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./SafeMath.sol";
import "./Ownable.sol";

contract Kittycontract is IERC721, Ownable {

    using SafeMath for uint256;

    uint256 public constant CREATION_LIMIT_GEN0 = 10;

    // NOTE: since these are public, getters auto gen'd and we don't need to add our own getters
    //  to comply with interface
    string public constant name = "WolffKitties";
    string public constant symbol = "WK";

    // Birth Event
    event Birth(
        address owner,
        uint256 kittenId,
        uint256 maternalId,
        uint256 paternalId,
        uint256 geneSequence
    );

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

    uint256 public gen0Count;

    // Get Kitty
    /*
     * defining whats returned in 'returns' instead of a return statement in the function body
     *  - this is an in effect same difference, just a cleaner way of doing with multiple vals
     * returning all values as unint256 as much easier to read
    */
    function getKitty(uint256 _id) external view returns (
        uint256 geneSequence,
        uint256 birthTime,
        uint256 maternalId,
        uint256 paternalId,
        uint256 generation
    ) {
        // Use 'storage' here as it creates a pointer -- if we used 'memory', it would create a local copy
        Kitty storage kitty = kitties[_id];

        birthTime = uint256(kitty.birthTime);
        maternalId = uint256(kitty.maternalId);
        paternalId = uint256(kitty.paternalId);
        generation = uint256(kitty.generation);
        geneSequence = uint256(kitty.geneSequence);
    }

    // Generation 0 Kitty creation function usable only by contract owner
    function createKittyGen0(uint256 _geneSequence) public onlyOwner returns (uint256) {
        require(gen0Count < CREATION_LIMIT_GEN0);

        gen0Count++;

        return _createKitty(0, 0, 0, _geneSequence, msg.sender);
    }

    // Function to create Kitty
    function _createKitty(
        uint256 _maternalId,
        uint256 _paternalId,
        uint256 _generation,
        uint256 _geneSequence,
        address _owner
    ) private returns (uint256) {
        Kitty memory _kitty = Kitty({
            geneSequence: _geneSequence,
            birthTime: uint64(now),
            maternalId: uint32(_maternalId),
            paternalId: uint32(_paternalId),
            generation: uint16(_generation)
        });

        // 'push' returns size of array - we want to start id's from 0, so we subtract 1
        uint256 newKittenId = kitties.push(_kitty) - 1;

        emit Birth(_owner, newKittenId, _maternalId, _paternalId, _geneSequence);

        // Address 0 implies this is a 'birth', as its not transferred from a previous owner
        _transfer(address(0), _owner, newKittenId);

        return newKittenId;
    }

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
        // require(kittyOwner[_tokenId].exists,  'Token Id not found');
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

    // Get a list of all kitty id's for an owner
    function getKittiesByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownershipTokenCount[_owner]);
        uint kittyCount = 0;
        for (uint i = 0; i < kitties.length; i++) {
            if (kittyOwner[i] == _owner) {
                result[kittyCount] = i;
                kittyCount++;
            }
        }

        return result;
    }
}
