const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const bodaDeploy = async () => {
  const proxyAddr = process.env.PARENT_CONTRACT_ADDRESS;
  const newContract = await ethers.getContractFactory("BodaBlocks");
  const contractProxy = await upgrades.upgradeProxy(proxyAddr, newContract);
  await contractProxy.waitForDeployment();
  console.log("✅ Proxy deployed at: ", contractProxy.target);
};
bodaDeploy()
  .then(() => console.log("Deployed succesfully"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
