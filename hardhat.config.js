require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balances", "Prints the balances of contracts", async (taskArgs, hre) => {
  const nonAttackerContractAddress =
    "0xfB281ce015C885fB5096907a59c80c391B2599E9";
  const attackerContractAddress = "0x197fD5E20C4073683C551416685AFA6e3E4cE1Aa";

  console.log();
  nonAttackerContractBalance = await hre.ethers.provider.getBalance(
    nonAttackerContractAddress
  );
  console.log(
    "\uD83D\uDC68 Non attacker contract balance:",
    ethers.utils.formatEther(nonAttackerContractBalance),
    "ETH",
    "\n"
  );
  attackerContractBalance = await hre.ethers.provider.getBalance(
    attackerContractAddress
  );
  console.log(
    "\uD83D\uDD75  Attacker contract balance:",
    ethers.utils.formatEther(attackerContractBalance),
    "ETH",
    "\n"
  );
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
    },
  },
  solidity: {
    version: "0.8.7",
  },
};
