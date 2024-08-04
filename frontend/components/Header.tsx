import { ConnectButton } from '@rainbow-me/rainbowkit';

/**
 * Header is a React functional component that renders the header of the application.
 * It includes a logo and a ConnectButton from RainbowKit for wallet connections.
 *
 * @returns {JSX.Element} The JSX for the header component.
 */
const Header = () => {
  return (
    <div className='flex justify-center items-center p-5'>
      <div className='grow'>
      <h1 className='text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600'>
      MTK
        </h1>
      </div>
      <ConnectButton />
    </div>
  );
}

export default Header;
