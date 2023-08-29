const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Uniswap Contract', async () => {
  let tokenA;
  let tokenB;
  let weth;
  let uniswapV2Factory;
  let uniswapV2Router02;
  let TOKEN_A_AMOUNT = ethers.parseEther('10000');
  let TOKEN_B_AMOUNT = ethers.parseEther('10000');
  beforeEach(async () => {
    signer = await ethers.getSigners();
    const TokenA = await ethers.getContractFactory('TokenA');
    tokenA = await TokenA.connect(signer[0]).deploy();

    const TokenB = await ethers.getContractFactory('TokenB');
    tokenB = await TokenB.connect(signer[0]).deploy();

    const Weth = await ethers.getContractFactory('WETH9');
    weth = await Weth.connect(signer[0]).deploy();

    const UniswapV2Factory = await ethers.getContractFactory(
      'UniswapV2Factory'
    );
    uniswapV2Factory = await UniswapV2Factory.connect(signer[0]).deploy(
      signer[0].address
    );

    const UniswapV2Router02 = await ethers.getContractFactory(
      'UniswapV2Router02'
    );
    uniswapV2Router02 = await UniswapV2Router02.connect(signer[0]).deploy(
      uniswapV2Factory.target,
      weth.target
    );
    const GetInit = await ethers.getContractFactory('CalHash');
    getInit = await GetInit.deploy();

    initHash = await getInit.connect(signer[0]).getInitHash();
    console.log(initHash);
  });
  it('  *** Check The ethers Version & Contract address *** \n  ', async () => {
    const version = ethers.version;
    console.log(`
    Ethers Version : v${version}
    Token A Contract Address : ${await tokenA.target}
    Token B Contract Address : ${await tokenB.target}
    UniswapV2Factory Contract Address : ${await uniswapV2Factory.target}
    UniswapV2Router02 Contract Address : ${await uniswapV2Router02.target}
    WETH9 Contract Address : ${await weth.target}
    `);
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
    console.log(
      `Signer Balance of TokenA  : ${await tokenA.balanceOf(signer[0].address)}`
    );
  });
  it('  *** Token B : Check Name , Symbol and Totalsupply  *** \n ', async () => {
    console.log(`Name of the Token B : ${await tokenB.name()}`);
    expect(await tokenB.name()).to.be.equal('TokenB');
    console.log(`Symbol of the Token B : ${await tokenB.symbol()}`);
    expect(await tokenB.symbol()).to.be.equal('TB');
    console.log(`TotalSupply of the Token B : ${await tokenB.totalSupply()}`);
    expect(await tokenB.totalSupply()).to.be.equal(
      ethers.parseEther('10000000')
    );
    console.log(
      `Signer Balance of TokenB  : ${await tokenB.balanceOf(signer[0].address)}`
    );
  });
  it('  *** Check AddLiquidity ***  ', async () => {
    await tokenA
      .connect(signer[0])
      .approve(uniswapV2Router02.target, TOKEN_A_AMOUNT);
    await tokenB
      .connect(signer[0])
      .approve(uniswapV2Router02.target, TOKEN_B_AMOUNT);
    await uniswapV2Router02
      .connect(signer[0])
      .addLiquidity(
        tokenA.target,
        tokenB.target,
        TOKEN_A_AMOUNT,
        TOKEN_B_AMOUNT,
        1,
        1,
        signer[0].address,
        1695971128
      );
    //     address tokenA,
    //     address tokenB,
    //     uint amountADesired,
    //     uint amountBDesired,
    //     uint amountAMin,
    //     uint amountBMin,
    //     address to,
    //     uint deadline
  });
});
