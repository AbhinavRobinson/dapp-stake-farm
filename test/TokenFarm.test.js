const MastiToken = artifacts.require("MastiToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

// get chai
require("chai")
  .use(require("chai-as-promised"))
  .should();

const tokens = (n) => {
  return web3.utils.toWei(n, "Ether");
};

contract("TokenFarm", ([owner, investor]) => {
  // Tests
  let daiToken, mastiToken, tokenFarm;

  before(async () => {
    // Load Contracts
    daiToken = await DaiToken.new();
    mastiToken = await MastiToken.new();
    tokenFarm = await TokenFarm.new(mastiToken.address, daiToken.address);

    // Transfer all Masti Token to TokenFarm
    await mastiToken.transfer(tokenFarm.address, tokens("1000000"));

    // Transfer to investor
    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });

  describe("Mock Dai Deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });

  describe("Masti Deployment", async () => {
    it("has a name", async () => {
      const name = await mastiToken.name();
      assert.equal(name, "Masti Token");
    });
  });

  describe("Token Farm Deployment", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Masti Token Farm");
    });

    it("contract has tokens", async () => {
      let bal = await mastiToken.balanceOf(tokenFarm.address);
      assert.equal(bal.toString(), tokens("1000000"));
    });
  });
});
