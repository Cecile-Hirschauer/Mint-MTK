// SPDX-Licence-Identifier: MIT
pragma solidity 0.8.24;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./DataConsumerV3.sol";

/**
 * @title MyToken
 * @dev ERC20 token with minting functionality and price calculation based on Chainlink data feed.
 */
contract MyToken is ERC20, Ownable, DataConsumerV3 {
    uint256 private constant PRICE_PER_TOKEN = 10; // in Dollar

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {}

    /**
     * @notice Mints new tokens to a specified address.
     * @dev The minting price is calculated based on the current ETH/USD exchange rate from Chainlink.
     * @param _to The address to receive the minted tokens.
     * @param _amount The amount of tokens to mint.
     */
    function mint(address _to, uint256 _amount) external payable {
        int256 ethInDollar = getChainlinkDataFeedLatestAnswer(); // 345624579658$
        require(ethInDollar > 0, "Invalid value");

        uint256 ethInDollarUint = uint256(ethInDollar / 1e8); // 3456

        // Calculate the expected price in Wei for the given amount of tokens
        uint256 expectedPriceInWei = (PRICE_PER_TOKEN * 1 ether * _amount) / ethInDollarUint;
        // Example calculation: 10 * 1e18 * _amount / ethInDollarUint

        console.log("ethInDollars: ", ethInDollarUint);
        console.log("expectedPriceInWei: ", expectedPriceInWei);
        console.log("value provided: ", msg.value);

        require(msg.value > expectedPriceInWei, "Not enough funds provided");

        _mint(_to, _amount);
    }
}
