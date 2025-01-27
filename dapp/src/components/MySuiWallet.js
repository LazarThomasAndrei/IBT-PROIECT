import { ConnectButton, useCurrentWallet, useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import { mintIBTTokens } from '../scripts/mintSUI.js'; 

const MIST_PER_SUI = 1_000_000_000;

function MySuiWallet() {
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const suiClient = useSuiClient({ network: 'sui:devnet' });
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchBalance = async () => {
    if (!currentWallet || connectionStatus !== 'connected') return;

    try {
      const account = currentWallet.accounts[0];
      if (!account) throw new Error('No account found in wallet.');

      const result = await suiClient.getBalance({ owner: account.address + '' });
      const suiBalance = Number(result.totalBalance) / Number(MIST_PER_SUI);
      setBalance(suiBalance);
      setError('');
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(err.message || 'Failed to fetch balance.');
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [currentWallet, connectionStatus]);

  return (
    <div>
      <ConnectButton />
      <div className='wallet-info'>
        {connectionStatus === 'connected' ? (
          <div className='wallet-info'>
            <h4>Current Account</h4>
            {currentWallet.accounts.map((account) => (
              <p key={account.address}>- {account.address}</p>
            ))}
            <p>Balance: {balance} SUI</p>
            <button onClick={() => mintIBTTokens(currentWallet, suiClient, setError, setIsProcessing)} disabled={isProcessing}>
              {isProcessing ? 'Minting...' : 'Mint IBT Tokens'}
            </button>
            <p>{error}</p>
          </div>
        ) : (
          <div>Connection status: {connectionStatus}</div>
        )}
      </div>
    </div>
  );
}

export default MySuiWallet;
