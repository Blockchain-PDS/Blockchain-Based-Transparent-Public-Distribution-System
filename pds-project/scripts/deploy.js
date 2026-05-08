import { ethers } from "ethers";
import fs from "fs";

// Connect to local Hardhat node
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Use Account #0 private key (from your terminal)
const wallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

async function main() {
  // Load compiled contract
  const abi = JSON.parse(
    fs.readFileSync("./artifacts/contracts/PDS.sol/PDS.json")
  ).abi;

  const bytecode = JSON.parse(
    fs.readFileSync("./artifacts/contracts/PDS.sol/PDS.json")
  ).bytecode;

  // Deploy
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed at:", await contract.getAddress());
}

main();