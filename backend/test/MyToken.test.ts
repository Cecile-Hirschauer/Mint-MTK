import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import { log } from "console";
import hre from "hardhat";

describe("MyToken", function () {

  /**
   * Fixture to deploy the MyToken contract and setup initial accounts.
   * @returns {Object} The deployed contract and signer accounts.
   */
  async function deployMyTokenFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    return { myToken, owner, otherAccount };
  }

  describe("Deployment", function() {
    it("Should deploy MyToken Contract and get the right price for 1 ether", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(deployMyTokenFixture);
      const ethPriceFromChainLink = await myToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      // Check if the price is within an expected range
      assert(parseInt(ethInDollars) >= 2900 && parseInt(ethInDollars) <= 3100);   
    });
  });
  
  describe("Mint", function() {
    it("Should not mint if not enough funds are provided", async function() {
      const { myToken, owner, otherAccount } = await loadFixture(deployMyTokenFixture);
      const ethPriceFromChainLink = await myToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 18;
      const amountEthFor18Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor18Tokens = hre.ethers.parseEther(amountEthFor18Tokens.toString());
      // Expect the transaction to be reverted with the message "Not enough funds provided"
      await expect(myToken.mint(owner.address, 20, { value: priceFor18Tokens })).to.be.revertedWith("Not enough funds provided");
    });

    it("Should mint if enough funds are provided", async function() {
      const { myToken, owner, otherAccount } = await loadFixture(deployMyTokenFixture);
      const ethPriceFromChainLink = await myToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 20;
      const amountEthFor20Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor20Tokens = hre.ethers.parseEther(amountEthFor20Tokens.toString());
      await myToken.mint(owner.address, 20, { value: priceFor20Tokens });
      const balanceOfOwner = await myToken.balanceOf(owner.address);
      // Assert that the balance of the owner is 20 tokens
      assert(Number(balanceOfOwner) === 20);
    });
  });
});
