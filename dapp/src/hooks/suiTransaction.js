import {
  ConnectButton,
  useSuiClient,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useState } from 'react';

function TransactionHandler() {
  const client = useSuiClient();
  const { mutate: executeTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });

  const [transactionDigest, setTransactionDigest] = useState('');
  const currentAccount = useCurrentAccount();

  const handleClick = () => {
    executeTransaction(
      {
        transaction: new Transaction(),
        chain: 'sui:devnet',
      },
      {
        onSuccess: (result) => {
          console.log('Transaction object changes', result.objectChanges);
          setTransactionDigest(result.digest);
        },
      },
    );
  };

  return (
    <div style={{ padding: 20 }}>
      {currentAccount && (
        <>
          <div>
            <button className='btn' onClick={handleClick}>
              Execute Transaction
            </button>
          </div>
          <div>Transaction Digest: {transactionDigest}</div>
        </>
      )}
    </div>
  );
}

export default TransactionHandler;