# Token Minting DApp

## Overview
This project is a decentralized application (DApp) that allows users to mint their own MTK tokens. The application is built using React, Tailwind CSS, and Shadcn UI components, and interacts with an Ethereum smart contract using the Wagmi library.

## Features
- **Connect Wallet:** Users can connect their Ethereum wallet to the DApp.
- **Mint Tokens:** Users can mint MTK tokens by selecting different amounts ($100, $200, $500, $1000).
- **Transaction Status:** Users can see the transaction hash, waiting confirmation status, and transaction confirmation status.
- **Error Handling:** Errors during the transaction process are displayed to the user.
- 
## Technologies Used
- **Nextjs:** Frontend framework for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Shadcn UI:** Component library used for buttons, alerts, and other UI elements.
- **Wagmi:** React hooks library for Ethereum.
- **Viem:** Library for Ethereum-related utility functions.

### Prerequisites
- Node.js (LTS or later)
- npm or yarn

## Usage
1. **Connect your wallet:** Click on the "Connect Wallet" button to connect your Ethereum wallet using RainbowKit.
2. **Mint tokens:** Choose the amount you want to mint and click on the corresponding "Mint for $XXX" button.
3. **Transaction status:** Monitor the status of your transaction. You will see the transaction hash, waiting confirmation status, and transaction confirmation status.
4. **Error handling:** If there are any errors during the transaction process, they will be displayed to you.

## Smart Contract
### Deployment
1. Make sure you have Hardhat installed and set up.
2. Deploy the smart contract using the following command:
```sh
yarn hardhat ignition deploy ./ignition/modules/MyToken.ts --network localhost
```
### Tests
1. Run the tests using the following command:
```sh
yarn hardhat test
```
## License
This project is licensed under the MIT License.

