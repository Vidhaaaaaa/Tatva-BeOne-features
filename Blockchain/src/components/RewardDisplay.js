import React, { useState } from 'react';
import { useWeb3 } from '../utils/web3Context';
import { ethers } from 'ethers';

const RewardDisplay = () => {
  const { contract, balance } = useWeb3();
  const [selectedReward, setSelectedReward] = useState(null);
  const [loading, setLoading] = useState(false);

  const rewards = [
    {
      id: 1,
      name: '10% Discount Coupon',
      cost: 100,
      type: 'discount'
    },
    {
      id: 2,
      name: 'Charity Donation ($10)',
      cost: 100,
      type: 'donation'
    },
    {
      id: 3,
      name: 'Premium Feature Access',
      cost: 50,
      type: 'premium'
    }
  ];

  const handleRedeem = async (reward) => {
    if (!contract) return;
    
    try {
      setLoading(true);
      const amount = ethers.utils.parseEther(reward.cost.toString());
      
      if (parseFloat(balance) < reward.cost) {
        alert('Insufficient token balance');
        return;
      }

      const tx = await contract.burnForReward(amount, reward.type);
      await tx.wait();
      
      alert('Reward redeemed successfully!');
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('Failed to redeem reward. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rewards-container">
      <style jsx>{`
        .rewards-container {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .reward-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .reward-card:hover {
          transform: translateY(-5px);
        }

        .reward-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .reward-cost {
          color: #666;
          margin-bottom: 1rem;
        }

        .redeem-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .redeem-button:hover {
          background: #45a049;
        }

        .redeem-button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }

        .balance-display {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.5rem;
          color: #333;
        }
      `}</style>

      <div className="balance-display">
        Available Balance: {parseFloat(balance).toFixed(2)} WELL
      </div>

      <div className="rewards-grid">
        {rewards.map((reward) => (
          <div key={reward.id} className="reward-card">
            <div className="reward-name">{reward.name}</div>
            <div className="reward-cost">Cost: {reward.cost} WELL</div>
            <button
              className="redeem-button"
              onClick={() => handleRedeem(reward)}
              disabled={loading || parseFloat(balance) < reward.cost}
            >
              {loading ? 'Processing...' : 'Redeem Reward'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardDisplay; 