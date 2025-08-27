const { ethers, upgrades } = require('hardhat');
require('dotenv').config();

const bodaDeploy = async () => {
  const stableToken = process.env.STABLE_TOKEN;
  const contract = await ethers.getContractFactory('BodaBlocks');
  const contractProxy = await upgrades.deployProxy(contract, [stableToken], {
    initializer: 'initialize',
  });
  await contractProxy.waitForDeployment();
  console.log('✅ Proxy deployed at: ', contractProxy.target);
};
bodaDeploy()
    .then(() => console.log('Deployed succesfully'))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
