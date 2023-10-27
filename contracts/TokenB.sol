// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract TokenB is ERC20 {
    constructor() ERC20("TokenB","TB"){
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}