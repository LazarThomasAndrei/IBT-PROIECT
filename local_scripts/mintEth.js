const { ethers } = require("ethers");   

async function mintTokens() {
    const contractAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; 
    const recipientAddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
    const amountToMint = ethers.utils.parseUnits("77", 18); 

    const IBTContract = await ethers.getContractAt("IBT", contractAddress);
    const mintTransaction = await IBTContract.mint(recipientAddress, amountToMint);
    await mintTransaction.wait();
    console.log(`Minted 77 IBT tokens to ${recipientAddress}`);

    const newBalance = await IBTContract.balanceOf(recipientAddress);
    console.log(`New balance of ${recipientAddress}: ${ethers.utils.formatUnits(newBalance, 18)} IBT`);
}

mintTokens().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


