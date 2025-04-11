import React from 'react';
import { useWeb3 } from '../utils/web3Context';

const WalletConnect = () => {
  const { account, balance, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div className="wallet-container">
      <style jsx>{`
        .wallet-container {
          padding: 1rem;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 2rem auto;
        }

        .wallet-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .wallet-button:hover {
          background: #45a049;
        }

        .wallet-info {
          margin-top: 1rem;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 6px;
        }

        .balance {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 0.5rem 0;
        }

        .address {
          font-family: monospace;
          color: #666;
          word-break: break-all;
        }
      `}</style>

      {!account ? (
        <button className="wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <h3>Connected Wallet</h3>
          <p className="address">
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <div className="balance">
            Balance: {parseFloat(balance).toFixed(2)} WELL
          </div>
          <button
            className="wallet-button"
            onClick={disconnectWallet}
            style={{ background: '#f44336' }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 