import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useCurrentWallet } from '@mysten/dapp-kit';

const TransactionContainer = () => {
  const [transferType, setTransferType] = useState('EthereumToSUI');
  const [amount, setAmount] = useState('');
  const { connectSuiWallet } = useCurrentWallet();

  const handleTransferTypeChange = () => {
    setTransferType((prevType) => (prevType === 'EthereumToSUI' ? 'SUIToEthereum' : 'EthereumToSUI'));
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTransfer = async () => {
    if (transferType === 'EthereumToSUI') {
      console.log(`Transferring ${amount} IBT from Ethereum to SUI`);
    } else {
      console.log(`Transferring ${amount} IBT from SUI to Ethereum`);
    }
  };

  return (
    <div className="transaction-container" style={{ width: '100%' }}>
      <h2>Transfer IBT Tokens</h2>
      <div className="transfer-type">
        <label>
          <input
            type="radio"
            value="EthereumToSUI"
            checked={transferType === 'EthereumToSUI'}
            onChange={handleTransferTypeChange}
          />
          Ethereum to SUI
        </label>
        <label>
          <input
            type="radio"
            value="SUIToEthereum"
            checked={transferType === 'SUIToEthereum'}
            onChange={handleTransferTypeChange}
          />
          SUI to Ethereum
        </label>
      </div>
      <div className="amount-input">
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <button className="btn" onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  );
};

export default TransactionContainer;