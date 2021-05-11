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

  describe("Farming Tokens", async () => {
    it("rewards investors for staking mDai Tokens", async () => {
      let result;

      // check investor balance
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor mDai wallet balance is correct for staking."
      );

      // Stake mDai tokens
      await daiToken.approve(tokenFarm.address, tokens("100"), {
        from: investor,
      });
      await tokenFarm.stakeTokens(tokens("100"), { from: investor });

      // check token transferred.
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor has transferred tokens for staking."
      );

      // check token received.
      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "mDai tokens from investor received."
      );
    });
  });
});
