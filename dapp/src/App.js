import React, { useState, useEffect } from 'react';
import './styles/App.css';
import MetaMaskComponent from './components/MyMetamask';
import SuiWalletComponent from './components/MySuiWallet';
import TransactionComponent from './components/TransactionContainer';
import '@mysten/dapp-kit/dist/index.css';

function MainApp() {
  const [activeWallet, setActiveWallet] = useState('Ethereum');
  const [ethWalletDetails, setEthWalletDetails] = useState({ address: '', balance: '' });

  useEffect(() => {
    const storedWalletInfo = JSON.parse(localStorage.getItem('ethWalletInfo'));
    if (storedWalletInfo) {
      setEthWalletDetails(storedWalletInfo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ethWalletInfo', JSON.stringify(ethWalletDetails));
  }, [ethWalletDetails]);

  const switchWallet = (type) => {
    setActiveWallet(type);
    setEthWalletDetails({ address: '', balance: '' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>IBT Token Exchange</h1>
      </header>
      <main className="wallets-container">
        <div className="wallet-container">
          <h2>MetaMask</h2>
          <MetaMaskComponent walletType={activeWallet} setWalletInfo={setEthWalletDetails} />
        </div>
        <div className="wallet-container">
          <h2>SUI Wallet</h2>
          <SuiWalletComponent />
        </div>
      </main>   
      <TransactionComponent />
    </div>
  );
}

export default MainApp;