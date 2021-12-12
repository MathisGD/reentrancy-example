//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

contract Vulnerable {
    bool private hasBeenWithdrawed = false;

    receive() external payable {}

    function withdraw() public {
        require(!hasBeenWithdrawed, "Your ether has already been withdrawed");

        (bool success, ) = msg.sender.call{value: 1 ether}("");
        require(success, "Transaction failed");

        hasBeenWithdrawed = true;
    }
}
