const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Uniswap Contract', async () => {
  let tokenA;
  let tokenB;
  let weth;
  let UniswapV2Pair;
  let uniswapV2Pair;
  let uniswapV2Factory;
  let uniswapV2Router02;
  let amountETHMin=ethers.parseEther("1");
  let amountAMin=ethers.parseEther("1");
  let amountBMin=ethers.parseEther("1");
  let TOKEN_A_AMOUNT = ethers.parseEther('100');
  let TOKEN_B_AMOUNT = ethers.parseEther('200');
  let TOKEN_A_AMOUNTA = ethers.parseEther('50');
  let TOKEN_B_AMOUNTB = ethers.parseEther('10');
  const deadline = Math.floor(Date.now() / 1000) + 3600;

  async function _addLiquidity(){
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNT);
    await tokenB.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_B_AMOUNT);
    console.log(`TOKEN_A_AMOUNT : ${TOKEN_A_AMOUNT} \n    TOKEN_B_AMOUNT : ${TOKEN_B_AMOUNT}`);
     // function addLiquidity(address tokenA,address tokenB, uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline)
    await uniswapV2Router02.connect(signer[0]).addLiquidity(tokenA.target,tokenB.target,TOKEN_A_AMOUNT,TOKEN_B_AMOUNT,amountAMin,amountBMin,signer[0].address,deadline);
  }
  
  beforeEach(async () => {
    signer = await ethers.getSigners();
    const TokenA = await ethers.getContractFactory('TokenA');
    tokenA = await TokenA.connect(signer[0]).deploy();

    const TokenB = await ethers.getContractFactory('TokenB');
    tokenB = await TokenB.connect(signer[0]).deploy();

    const Weth = await ethers.getContractFactory('WETH9');
    weth = await Weth.connect(signer[0]).deploy();

    const UniswapV2Factory = await ethers.getContractFactory('UniswapV2Factory');
    uniswapV2Factory = await UniswapV2Factory.connect(signer[0]).deploy(signer[0].address);

    const UniswapV2Router02 = await ethers.getContractFactory('UniswapV2Router02');
    uniswapV2Router02 = await UniswapV2Router02.connect(signer[0]).deploy(uniswapV2Factory.target,weth.target);

    UniswapV2Pair = await ethers.getContractFactory('UniswapV2Pair');
    uniswapV2Pair = await UniswapV2Pair.connect(signer[0]).deploy();

    const GetInit = await ethers.getContractFactory('CalHash');
    getInit = await GetInit.deploy();
    initHash = await getInit.connect(signer[0]).getInitHash();
  });
  it('  *** Check AddLiquidity ***  ', async () => {
    console.log(`Init Hash : ${initHash}`);
    await _addLiquidity();
    // function addLiquidity(address tokenA,address tokenB, uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline)
    console.log(`Contract Address of Uniswap Pair: ${uniswapV2Pair.target}`);
    let pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    console.log(`Pair Address : ${pair}`);
    let uniswapV2PairAt = await uniswapV2Pair.connect(signer[0]).attach(pair);
    console.log(`Balance Of Attached Uniswap Pair : ${await uniswapV2PairAt.balanceOf(signer[0].address)}`);
    console.log(`reserve ${await uniswapV2PairAt.getReserves()}`);

    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNTA);
    await tokenB.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_B_AMOUNTB);
    console.log(`TOKEN_A_AMOUNT : ${TOKEN_A_AMOUNTA} \n    TOKEN_B_AMOUNT : ${TOKEN_B_AMOUNTB}`);
    await uniswapV2Router02.connect(signer[0]).addLiquidity(tokenA.target,tokenB.target,TOKEN_A_AMOUNTA,TOKEN_B_AMOUNTB,amountAMin,amountBMin,signer[0].address,deadline);
    console.log(`reserve ${await uniswapV2PairAt.getReserves()}`);

    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_B_AMOUNTB);
    await tokenB.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNTA);
    console.log(`TOKEN_A_AMOUNTA : ${TOKEN_A_AMOUNTA} \n    TOKEN_B_AMOUNTB : ${TOKEN_B_AMOUNTB}`);
    await uniswapV2Router02.connect(signer[0]).addLiquidity(tokenA.target,tokenB.target,TOKEN_A_AMOUNTA,TOKEN_B_AMOUNTB,amountAMin,amountBMin,signer[0].address,deadline);
    console.log(`reserve ${await uniswapV2PairAt.getReserves()}`);

    await _addLiquidity();
    // function addLiquidity(address tokenA,address tokenB, uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline)
    console.log(`Contract Address of Uniswap Pair: ${uniswapV2Pair.target}`);
    // let pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    console.log(`Pair Address : ${pair}`);
    // let uniswapV2PairAt = await uniswapV2Pair.connect(signer[0]).attach(pair);
    console.log(`Balance Of Attached Uniswap Pair : ${await uniswapV2PairAt.balanceOf(signer[0].address)}`);
    console.log(`reserve ${await uniswapV2PairAt.getReserves()}`);
  });
});