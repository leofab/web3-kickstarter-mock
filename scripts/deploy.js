// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require('web3');
const { ethers } = require("hardhat");

const provider = new HDWalletProvider('oak remain obtain task drip boy early wet segment sport fun source',
    'https://sepolia.infura.io/v3/c0e92b8c927e4421bf01f62fb85487d4');

const web3 = new Web3(provider, null, {transactionConfirmationBlocks: 1});

async function main() {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await ethers.deployContract("Campanha", [], {from: accounts[0]});
  await result.waitForDeployment();
  console.log("Contract deployed to:", result.deploymentTransaction.to);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
