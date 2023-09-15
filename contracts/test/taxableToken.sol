// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol'; 

contract taxableToken is ERC20{
    constructor() ERC20('TAX TOKEN','TX'){
     _mint(msg.sender,10000000 * 10 ** decimals());
    }
     function _transfer(address sender, address receiver, uint256 amount) internal virtual override {
        uint256 taxAmount = (amount * 1000) / 10000; // Calculate the 10% tax amount
        //10*10/100=1
        //10-1=9
        uint256 netAmount = amount - taxAmount;  // Calculate the net amount to be received by the receiver
        super._transfer(sender, address(this), taxAmount); // Transfer the tax to the contract
        super._transfer(sender, receiver, netAmount);     // Transfer the net amount to the receiver
    }

//    function _transfer(address sender, address receiver,uint256 amount) internal virtual override {
//      super._transfer(sender,address(this),(amount*500)/10000);
//      super._transfer(sender,receiver,amount - ((amount*500)/10000));

   
}
