const { utils, Bignumber } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  signers = await ethers.getSigners();
  [owner, ...addrs] = signers;

  const Vulnerable = await hre.ethers.getContractFactory("Vulnerable");
  const vulnerable = await Vulnerable.deploy();
  await vulnerable.deployed();
  console.log("Vulnerable deployed to:", vulnerable.address);

  const NonAttackerContract = await hre.ethers.getContractFactory(
    "NonAttackerContract"
  );
  const nonAttackerContract = await NonAttackerContract.deploy(
    vulnerable.address
  );
  await nonAttackerContract.deployed();
  console.log("NonAttackerContract deployed to:", nonAttackerContract.address);

  const AttackerContract = await hre.ethers.getContractFactory(
    "AttackerContract"
  );
  const attackerContract = await AttackerContract.deploy(vulnerable.address);
  await attackerContract.deployed();
  console.log("AttackerContract deployed to:", attackerContract.address);

  const tx = owner.sendTransaction({
    to: vulnerable.address,
    value: ethers.utils.parseEther("50.0"),
  });
  await tx;

  console.log("\uD83C\uDF7B Contracts deployed !");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
