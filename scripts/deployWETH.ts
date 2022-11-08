import { ethers } from "hardhat";
const { writeFileSync } = require("fs");

async function main() {

  const WETH9 = await ethers.getContractFactory("contracts/WETH.sol:WETH9");

  const weth = await WETH9.deploy();

  await weth.deployed();

  console.log(`Deployed to ${weth.address}`);
  console.log(`Block explorer URL: https://l2scan.scroll.io/address/${weth.address}`);


  writeFileSync(
    "wethAddress.json",
    JSON.stringify({ contractAddress: weth.address }, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
