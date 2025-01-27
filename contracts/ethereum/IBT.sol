// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Update to at least 0.8.20

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IBT is ERC20, Ownable {
    // Add Ownable(msg.sender) to initialize the owner
    constructor() ERC20("IBT", "IBT") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}