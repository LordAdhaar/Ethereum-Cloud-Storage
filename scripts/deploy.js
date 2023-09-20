const hre = require("hardhat");

// Import the hardhat library
// Define the main function to deploy the contract and log the deployment address
async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Library deployed to:", upload.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
