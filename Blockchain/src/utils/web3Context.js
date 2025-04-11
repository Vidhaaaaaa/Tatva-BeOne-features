import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 137], // Ethereum Mainnet and Polygon
});

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      
      setAccount(accounts[0]);
      setProvider(provider);
      
      // Initialize contract
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const contractABI = []; // Add your contract ABI here
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract);
      
      // Get initial balance
      const balance = await contract.balanceOf(accounts[0]);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setContract(null);
    setBalance('0');
  };

  useEffect(() => {
    if (account && contract) {
      // Listen for balance changes
      contract.on('Transfer', async (from, to, amount, event) => {
        if (from === account || to === account) {
          const newBalance = await contract.balanceOf(account);
          setBalance(ethers.utils.formatEther(newBalance));
        }
      });
    }
  }, [account, contract]);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        contract,
        balance,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}; 