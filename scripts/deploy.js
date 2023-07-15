const { ethers } = require("hardhat");

async function main() {
  const nftMarketplace = await ethers.deployContract("NFTMarketplace");

  console.log(
    "NFTMarketplace deployed to: ",
    await nftMarketplace.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
