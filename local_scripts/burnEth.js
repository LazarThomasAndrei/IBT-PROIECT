const { ethers } = require("hardhat");

async function burnTokens() {
    const contractAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; 
    const burnerAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; 
    const amountToBurn = ethers.utils.parseUnits("77", 18); 
    const IBTContract = await ethers.getContractAt("IBT", contractAddress);

    const initialBalance = await IBTContract.balanceOf(burnerAddress);
    console.log(`Initial balance of ${burnerAddress}: ${ethers.utils.formatUnits(initialBalance, 18)} IBT`);

    const burnTransaction = await IBTContract.burn(burnerAddress, amountToBurn); 
    await burnTransaction.wait();
    console.log(`Burned ${ethers.utils.formatUnits(amountToBurn, 18)} IBT tokens from ${burnerAddress}`);

    const finalBalance = await IBTContract.balanceOf(burnerAddress);
    console.log(`Final balance of ${burnerAddress}: ${ethers.utils.formatUnits(finalBalance, 18)} IBT`);
}

burnTokens().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
