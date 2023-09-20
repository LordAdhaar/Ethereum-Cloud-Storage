require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: process.env.ENDPOINT_URL,
      accounts: [process.env.DEPLOYER_KEY]
    },
    sepolia: {
      url: process.env.ENDPOINT_URL,
      accounts: [process.env.DEPLOYER_KEY]
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};