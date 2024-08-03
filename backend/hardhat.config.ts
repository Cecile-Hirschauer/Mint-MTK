import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/a5495fd7efd3403096a8508d33245e9e",
        blockNumber: 20448099
      }
    }
  }
};

export default config;
