//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

contract Vulnerable {
    mapping(address => uint256) balances;

    constructor() {
        balances[0xfB281ce015C885fB5096907a59c80c391B2599E9] = 1 ether; // NonAttackerContract
        balances[0x197fD5E20C4073683C551416685AFA6e3E4cE1Aa] = 1 ether; // AttackerContract
    }

    receive() external payable {}

    function withdraw() public {
        require(
            balances[msg.sender] != 0,
            "Your ether has already been withdrawed"
        );

        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "Transaction failed");

        balances[msg.sender] = 0;
    }
}
