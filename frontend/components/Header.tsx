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
      <div className='grow'>Logo</div>
      <ConnectButton />
    </div>
  );
}

export default Header;
