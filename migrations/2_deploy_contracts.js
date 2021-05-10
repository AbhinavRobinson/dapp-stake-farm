const MastiToken = artifacts.require("MastiToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
  // Deploy mock DAI
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  // Deploy mock MSTI
  await deployer.deploy(MastiToken);
  const mastiToken = await MastiToken.deployed();

  // Deploy TokenFarm Contract
  await deployer.deploy(TokenFarm, mastiToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();
  // Transfer all Masti tokens to TokenFarm (1 mil) aka create liquidity pool
  await mastiToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // Transfer 100 Mock DAI to investor
  await daiToken.transfer(accounts[1], "100000000000000000000");
};
