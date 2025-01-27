export const mintTokens = async (wallet, client, setErrorMsg, setProcessing) => {
  if (!wallet?.accounts[0]) {
    setErrorMsg('Wallet not connected');
    return;
  }

  try {
    setProcessing(true);
    const signFeature = wallet?.features['sui:signAndExecuteTransaction'];

    if (!signFeature) {
      throw new Error('Required wallet features missing');
    }

    const amountToMint = 777; 

    const transactionData = {
      kind: 'moveCall',
      packageObjectId: '0x29029bec7b2f1cf44fb5e40c23c0084672de4c3f3bc4a2c28722084e68a8c04e',
      module: 'IBT',
      function: 'mint',
      typeArguments: [],
      arguments: [
        { type: 'address', value: wallet.accounts[0].address },
        { type: 'u64', value: amountToMint }
      ],
    };

    const transaction = await signFeature.signAndExecuteTransaction(transactionData);
    setErrorMsg(`Transaction initiated: ${transaction.transactionDigest}`);

    await client.waitForTransaction(transaction.transactionDigest);
    setErrorMsg('IBT tokens minted successfully!');
  } catch (error) {
    setErrorMsg(error instanceof Error ? error.message : 'Token minting failed');
  } finally {
    setProcessing(false);
  }
};
