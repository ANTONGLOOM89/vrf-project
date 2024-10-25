/*global process*/
require('dotenv').config();
const { ethers } = require("hardhat");

const { VRF_ID } = process.env;

const subscriptionId = ethers.BigNumber.from(VRF_ID);

async function main() {
  const providerName = "sepolia";
  const provider = await ethers.providers.getDefaultProvider(providerName);
  const signers = await ethers.getSigners();

  const EOA = signers[0];
  // EOA address
  const deployer = await EOA.getAddress();

  // Transaction signing and execution
  const Randomizer = await ethers.getContractFactory("Randomizer");
  const randomizer = await Randomizer.deploy(subscriptionId); 
  const result = await randomizer.deployed();

  // Transaction details
  console.log("Contract deployment: Randomizer");
  console.log("Contract address:", randomizer.address);
  console.log("Transaction:", result.deployTransaction.hash);

  // Contract verification
  const execSync = require("child_process").execSync;
  execSync("npx hardhat verify --network " + providerName + " " + randomizer.address, { encoding: "utf-8" });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
});