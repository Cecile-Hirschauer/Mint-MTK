//SPDX-Licence-Identifier: MIT
pragma solidity 0.8.24;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./DataConsumerV3.sol";

contract MyToken is ERC20, Ownable, DataConsumerV3 {
    uint256 private constant PRICE_PER_TOKEN = 10; // in Dollar

    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {}

    function mint(address _to, uint256 _amount) external payable {
        int256 ethInDollar = getChainlinkDataFeedLatestAnswer(); // 345624579658$
        require(ethInDollar > 0, "Invalid value");

        uint256 ethInDollarUint = uint256(ethInDollar / 1e8); //3456

        // 1 token =< 10 $
        uint256 expectedPriceInWei = (PRICE_PER_TOKEN * 1 ether * _amount) / ethInDollarUint;
        // x = 10 * 17 / 3456 
        // 170/3456 => 0.049ETH * 10 ** 18 => 491898148,148148148
        console.log("ethInDollars: ", ethInDollarUint);
        console.log("expectedPriceInWei: ", expectedPriceInWei);
        console.log("value provided: ", msg.value);

        require(msg.value > expectedPriceInWei, "Not enough founds provided");

        _mint(_to, _amount);
    }
}