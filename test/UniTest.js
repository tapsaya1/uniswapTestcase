const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Uniswap Contract \n', async () => {
  let token;
  let Token;
  let TokenA;
  let TokenB;
  let tokenA;
  let tokenB;
  beforeEach(async () => {
    [owner, signer1, signer2, signerTo, spender] = await ethers.getSigners();
    TokenA = await ethers.getContractFactory('TokenA');
    TokenB = await ethers.getContractFactory('TokenB');
    Token = await ethers.getContractFactory('UniswapV2ERC20');
    tokenA = await TokenA.deploy();
    tokenB = await TokenB.deploy();
    token = await Token.deploy();
  });
  it('  *** Token A : Check Name , Symbol and Totalsupply *** \n  ', async () => {
    console.log(`Name of the Token A : ${await tokenA.name()}`);
    expect(await tokenA.name()).to.be.equal('TokenA');
    console.log(`Symbol of the Token A : ${await tokenA.symbol()}`);
    expect(await tokenA.symbol()).to.be.equal('TA');
    console.log(`TotalSupply of the Token A : ${await tokenA.totalSupply()}`);
    expect(await tokenA.totalSupply()).to.be.equal(
      ethers.parseEther('10000000')
    );
  });
  it('  *** Token B : Check Name , Symbol and Totalsupply  *** \n ', async () => {
    console.log(`Name of the Token B : ${await tokenA.name()}`);
    expect(await tokenB.name()).to.be.equal('TokenB');
    console.log(`Symbol of the Token B : ${await tokenA.symbol()}`);
    expect(await tokenB.symbol()).to.be.equal('TB');
    console.log(`TotalSupply of the Token B : ${await tokenA.totalSupply()}`);
    expect(await tokenA.totalSupply()).to.be.equal(
      ethers.parseEther('10000000')
    );
  });
});
