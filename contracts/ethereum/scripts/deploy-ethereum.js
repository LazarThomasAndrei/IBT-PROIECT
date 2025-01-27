async function deployContracts() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const IBTContract = await ethers.getContractFactory("IBT");
  const ibtInstance = await IBTContract.deploy();
  console.log("IBT deployed at:", ibtInstance.address);
}

deployContracts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

