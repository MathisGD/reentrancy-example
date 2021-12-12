//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "./interfaces/IVulnerable.sol";

contract NonAttackerContract {
    IVulnerable public vulnerable;

    uint256 reentrancyCount;

    constructor(address contractAddress) {
        vulnerable = IVulnerable(contractAddress);
    }

    receive() external payable {}

    function withdraw() public {
        vulnerable.withdraw();
    }
}
