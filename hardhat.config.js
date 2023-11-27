require("@nomicfoundation/hardhat-toolbox");
const SEPOLIA_PRIVATE_KEY = "c0e92b8c927e4421bf01f62fb85487d4";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/c0e92b8c927e4421bf01f62fb85487d4",
      accounts: [`${SEPOLIA_PRIVATE_KEY}`]
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./build",
  },
};
