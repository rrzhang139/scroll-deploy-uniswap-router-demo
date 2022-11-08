import { ethers } from "hardhat";
const { writeFileSync } = require("fs");

async function main() {
  const payload = require("fs").readFileSync("wethAddress.json");
  const wethAddress = JSON.parse(payload).contractAddress;
  const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");

  const router = await UniswapV2Router02.deploy("0x22a9B662dEDcCCe8690Ac95A6a6129dce07cF747", wethAddress);

  await router.deployed();

  console.log(`Deployed to ${router.address}`);
  console.log(`Block explorer URL: https://l2scan.scroll.io/address/${router.address}`);


  writeFileSync(
    "deployedAddress.json",
    JSON.stringify({ contractAddress: router.address }, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
