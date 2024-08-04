"use client"

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { contractAddress, contractAbi } from "@/contants";

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, type BaseError } from "wagmi";

import { parseEther } from "viem";
import { log } from "console";

/**
 * Home is the main component for the application, handling the minting of tokens.
 *
 * @returns {JSX.Element} The JSX for the Home component.
 */
export default function Home() {
  // Destructure isConnected and address from useAccount hook
  const {isConnected, address} = useAccount();

  // State to store the ETH price in USD
  const [ethPriceInUSD, setEthPriceInUSD] = useState<number | null>(null);

  // Hook to read the contract data
  const {data: ethPrice} = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getChainlinkDataFeedLatestAnswer"
  });

  // Hook to write to the contract
  const {data: hash, error, isPending, writeContract} = useWriteContract();

  /**
   * Function to mint tokens based on the USD amount provided.
   * @param {number} amountInUSD - The amount in USD to mint.
   */
  const mint = async (amountInUSD: number) => {
    let price;
    try {
      if(ethPriceInUSD) {
        price = (amountInUSD + 0.01*(amountInUSD)) / ethPriceInUSD;
        price = parseEther((price).toString());
      }
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "mint",
        args: [address, amountInUSD / 10],
        value: price
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Hook to wait for the transaction receipt
  const {isLoading: isComfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({hash});

  // Effect to update the ETH price in USD when ethPrice changes
  useEffect(() => {
    if(ethPrice) {
      const ethPriceInUSD = Number(ethPrice) / 10**8;
      setEthPriceInUSD(ethPriceInUSD);
    }
  }, [ethPrice]);

  /**
   * Function to render the mint option.
   * @param {number} amountInUSD - The amount in USD for the mint option.
   * @returns {JSX.Element} The JSX for the mint option.
   */
  const renderMintOption = (amountInUSD: number) => (
    <div className="flex flex-col p-8 items-center bg-gray-800 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">
        ${amountInUSD} <span className="text-sm text-gray-400">
          (~{ethPriceInUSD && (amountInUSD / ethPriceInUSD).toFixed(4)} ETH) 
        </span>
      </h2>
      <Button 
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full hover:from-blue-600 hover:to-purple-500 transition duration-300"
        onClick={() => mint(amountInUSD)}
      >
        Mint for ${amountInUSD}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="p-5 grow flex flex-col justify-center items-center"> 
        {isConnected ? (
         <>
          <h1 className="text-5xl font-extrabold mb-8 text-white">
            Mint your own MTK Tokens
          </h1>
          <p className="text-lg mb-12 text-gray-400">
            Choose the amount you want to mint:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl">
            {renderMintOption(100)}
            {renderMintOption(200)}
            {renderMintOption(500)}
            {renderMintOption(1000)}
          </div>
          <div className="mt-8 w-full max-w-3xl">
            {hash && <Alert className="bg-blue-600 text-white mt-2">
              <AlertTitle>Transaction Hash</AlertTitle>
              <AlertDescription>{hash}</AlertDescription>
            </Alert>}
            {isComfirming && <Alert className="bg-yellow-600 text-white mt-2">
              <AlertTitle>A moment...</AlertTitle>
              <AlertDescription>Waiting for confirmation</AlertDescription>
            </Alert>}
            {isConfirmed && <Alert className="bg-green-500 text-white mt-2">
              <AlertTitle>Congratulations!</AlertTitle>
              <AlertDescription>Transaction confirmed</AlertDescription>
            </Alert>}
            {error && <Alert className="bg-red-500 text-white mt-2">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{(error as BaseError).shortMessage || error.message}</AlertDescription>
            </Alert>}
          </div>
         </>
        ) : (
          <div className="text-center text-2xl text-white">
            Please connect your wallet to mint tokens.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
