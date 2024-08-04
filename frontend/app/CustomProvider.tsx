"use client"

// Importing CSS styles for RainbowKit
import '@rainbow-me/rainbowkit/styles.css';

// Importing necessary components and functions from RainbowKit
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

// Importing the WagmiProvider for managing blockchain connections and interactions
import { WagmiProvider } from 'wagmi';

// Importing the Hardhat chain configuration from Wagmi
import {
 hardhat
} from 'wagmi/chains';

// Importing providers for managing queries with React Query
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// Default configuration for RainbowKit and Wagmi
const config = getDefaultConfig({
    appName: 'My RainbowKit App', // Name of the application
    projectId: 'YOUR_PROJECT_ID', // Project ID (replace with your own)
    chains: [hardhat], // Supported chains (here, Hardhat)
    ssr: true, // If your dApp uses server-side rendering (SSR)
  });

// Creating an instance of QueryClient for managing queries
const queryClient = new QueryClient();

/**
 * CustomProvider is a React component that wraps its children with the necessary providers
 * for RainbowKit, Wagmi, and React Query.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The children to be wrapped by the provider.
 * @returns {JSX.Element} The JSX of CustomProvider.
 */
const CustomProvider = (
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({...darkTheme.accentColors.blue})}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default CustomProvider;
