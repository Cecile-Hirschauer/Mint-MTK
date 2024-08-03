import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import { log } from "console";
import hre from "hardhat";

describe("MyToken", function () {

  async function deployMyTokenFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    return {myToken, owner, otherAccount};
  }
    describe("Deployment", function() {
      it("Should deploy MyToken Contract and get the right price for 1 ether", async function () {
        const {myToken, owner, otherAccount} = await loadFixture(deployMyTokenFixture);
        const ethPriceFromChainLink = await myToken.getChainlinkDataFeedLatestAnswer();
        const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
        //console.log("eth in dollars: ", ethInDollars);
        assert(parseInt(ethInDollars) >= 2900 && parseInt(ethInDollars) <= 3100);   
    });
  });
  
  describe("mint", function() {
    it("Shoul not mint if not enough found provided", async function() {
      const {myToken, owner, otherAccount} = await loadFixture(deployMyTokenFixture);
      const ethPriceFromChainLink = await myToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 18;
      const amountEthFor18Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor18Tokens = hre.ethers.parseEther(amountEthFor18Tokens.toString());
      // console.log("priceFor18Tokens: ", priceFor18Tokens)
      await expect(myToken.mint(owner.address, 20, {value: priceFor18Tokens})).to.be.revertedWith("Not enough founds provided");
    });

    it("Shoul mint if enough founds are provided", async function() {
      const {myToken, owner, otherAccount} = await loadFixture(deployMyTokenFixture);
      const ethPriceFromChainLink = await myToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 20;
      const amountEthFor20Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor20Tokens = hre.ethers.parseEther(amountEthFor20Tokens.toString());
      await myToken.mint(owner.address, 20, {value: priceFor20Tokens});
      const balanceOfOwner = await myToken.balanceOf(owner.address);
      assert(Number(balanceOfOwner) === 20);
    })
  });
});
