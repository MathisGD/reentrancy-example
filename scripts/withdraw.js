const { utils, Bignumber } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const signers = await ethers.getSigners();
  [owner, ...addrs] = signers;

  const attackerContractAddress = "0xfB281ce015C885fB5096907a59c80c391B2599E9";

  const attackerContract = await ethers.getContractAt(
    "NonAttackerContract",
    attackerContractAddress,
    owner
  );

  tx = await attackerContract.connect(owner).withdraw();
  receipt = await tx.wait();

  if (receipt) {
    console.log("\u2705  Withdraw successful !");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
