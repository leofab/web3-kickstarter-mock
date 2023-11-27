require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
const { INFURA_PROJECT_ID, SEPOLIA_PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
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
      url: `https://sepolia.infura.io/v3/c0e92b8c927e4421bf01f62fb85487d4`,
      accounts: ['376ede10f438d287d6a6b290ee4c90e831c5c9310ac0f501edd62d5a18cd0228']
    }
  },
  paths: {
    sources: "./contracts",
    artifacts: "./build"
  }
};
