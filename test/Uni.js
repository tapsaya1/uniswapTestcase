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
  let amountOut = ethers.parseEther("1");
  let amountIn = ethers.parseEther("10");
  let amountInMax = ethers.parseEther("100")
  const ETH_AMOUNT = ethers.parseEther('100');
  let TOKEN_A_AMOUNT = ethers.parseEther('100');
  let TOKEN_B_AMOUNT = ethers.parseEther('200');
  // let TOKEN_A_AMOUNTA = ethers.parseEther('200');
  // let TOKEN_B_AMOUNTB = ethers.parseEther('100');
  const deadline = Math.floor(Date.now() / 1000) + 3600;

  async function _addLiquidity(){
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNT);
    await tokenB.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_B_AMOUNT);
    console.log(`TOKEN_A_AMOUNT : ${TOKEN_A_AMOUNT} \n    TOKEN_B_AMOUNT : ${TOKEN_B_AMOUNT}`);
    await uniswapV2Router02.connect(signer[0]).addLiquidity(tokenA.target,tokenB.target,TOKEN_A_AMOUNT,TOKEN_B_AMOUNT,1,1,signer[0].address,deadline);
  }
  
  async function _addLiquidityETH(){
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNT);
    console.log(`TOKEN_A_AMOUNT : ${TOKEN_A_AMOUNT} \n    ETH_AMOUNT : ${ETH_AMOUNT}`);
    await uniswapV2Router02.connect(signer[0]).addLiquidityETH(tokenA.target,TOKEN_A_AMOUNT,1,ETH_AMOUNT,signer[0].address,deadline,{ value: ETH_AMOUNT });
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

  it('  *** Check The ethers Version & Contract address *** \n  ', async () => {
    const version = ethers.version;
    console.log(`Ethers Version : v${version}
    Token A Contract Address : ${await tokenA.target}
    Token B Contract Address : ${await tokenB.target}
    UniswapV2Factory Contract Address : ${await uniswapV2Factory.target}
    UniswapV2Router02 Contract Address : ${await uniswapV2Router02.target}
    WETH9 Contract Address : ${await weth.target}`);
  });
  it('  *** Token A : Check Name , Symbol and Totalsupply *** \n  ', async () => {
    console.log(`Name of the Token A : ${await tokenA.name()}`);
    expect(await tokenA.name()).to.be.equal('TokenA');
    console.log(`Symbol of the Token A : ${await tokenA.symbol()}`);
    expect(await tokenA.symbol()).to.be.equal('TA');
    console.log(`TotalSupply of the Token A : ${await tokenA.totalSupply()}`);
    expect(await tokenA.totalSupply()).to.be.equal(ethers.parseEther('10000000'));
    console.log(`Signer Balance of TokenA  : ${await tokenA.balanceOf(signer[0].address)}`);
  });
  it('  *** Token B : Check Name , Symbol and Totalsupply  *** \n ', async () => {
    console.log(`Name of the Token B : ${await tokenB.name()}`);
    expect(await tokenB.name()).to.be.equal('TokenB');
    console.log(`Symbol of the Token B : ${await tokenB.symbol()}`);
    expect(await tokenB.symbol()).to.be.equal('TB');
    console.log(`TotalSupply of the Token B : ${await tokenB.totalSupply()}`);
    expect(await tokenB.totalSupply()).to.be.equal(ethers.parseEther('10000000'));
    console.log(`Signer Balance of TokenB  : ${await tokenB.balanceOf(signer[0].address)}`);
  });
  it('  *** Check AddLiquidity ***  ', async () => {
    console.log(`Init Hash : ${initHash}`);
    await _addLiquidity();

    console.log(`Contract Address of Uniswap Pair: ${uniswapV2Pair.target}`);
    let pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    console.log(`Pair Address : ${pair}`);
    let uniswapV2PairAt = await uniswapV2Pair.connect(signer[0]).attach(pair);
    console.log(`Balance Of Attached Uniswap Pair : ${await uniswapV2PairAt.balanceOf(signer[0].address)}`);
    console.log(`reserve ${await uniswapV2PairAt.getReserves()}`);
    // await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNTA);
    // await tokenB.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_B_AMOUNTB);
    // console.log(`TOKEN_A_AMOUNT : ${TOKEN_A_AMOUNTA} \n    TOKEN_B_AMOUNT : ${TOKEN_B_AMOUNTB}`);
    // await uniswapV2Router02.connect(signer[0]).addLiquidity(tokenA.target,tokenB.target,TOKEN_A_AMOUNTA,TOKEN_B_AMOUNTB,1,1,signer[0].address,deadline);
    // console.log(`reserve ${await uniswapV2PairAt.getReserves()}`);
    // console.log(`reserve ${await uniswapV2Pair.getReserves()}`)
  });
  it.only('  *** Check AddLiquidityETH ***  ', async () => {
    // console.log(`Init Hash : ${initHash}`);
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNT);
    await uniswapV2Router02.connect(signer[0]).addLiquidityETH(tokenA.target,TOKEN_A_AMOUNT,1,ETH_AMOUNT,signer[0].address,deadline,{ value: ETH_AMOUNT });

    console.log(`Contract Address of Uniswap Pair Contract: ${uniswapV2Pair.target}`);
    pair = await uniswapV2Factory.getPair(tokenA.target, weth.target);
    console.log(`Pair Address Of Token/Weth via Factory: ${pair}`);
    let uniswapV2PairAt = await uniswapV2Pair.connect(signer[0]).attach(pair);
    let liquidity = await uniswapV2PairAt.balanceOf(signer[0].address);
    console.log(`Liquidity After addLiquidityETH Function : ${liquidity}`);
    console.log(`Reserve After addLiquidityETH: ${await uniswapV2PairAt.getReserves()}`);
  });
  it('  *** Check RemoveLiquidity ***  ', async () => {
    // console.log(`Init Hash : ${initHash}`);
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_A_AMOUNT);
    await tokenB.connect(signer[0]).approve(uniswapV2Router02.target, TOKEN_B_AMOUNT);
    await uniswapV2Router02.connect(signer[0]).addLiquidity(tokenA.target,tokenB.target,TOKEN_A_AMOUNT,TOKEN_B_AMOUNT,1,1,signer[0].address,deadline);

    console.log(`Contract Address of Uniswap Pair Contract: ${uniswapV2Pair.target}`);
    pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    console.log(`Pair Address Of TokenA/TokenB via Factory: ${pair}`);
    let uniswapV2PairAt = await uniswapV2Pair.connect(signer[0]).attach(pair);
    console.log(`Liquidity After Add Liquidity Function : ${await uniswapV2PairAt.balanceOf(signer[0].address)}`);
    let liquidity = await uniswapV2PairAt.balanceOf(signer[0].address);
    console.log(`Reserve After Add Liquidity: ${await uniswapV2PairAt.getReserves()}`);
    await uniswapV2PairAt.connect(signer[0]).approve(uniswapV2Router02.target, liquidity);
    await uniswapV2Router02.connect(signer[0]).removeLiquidity(tokenA.target,tokenB.target,liquidity,1,1,signer[0].address,deadline);
    console.log(`Liquidity After Remove Liquidity Function : ${await uniswapV2PairAt.balanceOf(signer[0].address)}`);
    console.log(`Reserve After Remove Liquidity: ${await uniswapV2PairAt.getReserves()}`);
  });

  it('  *** Check removeLiquidityETH ***  ', async () => {
    // console.log(`Init Hash : ${initHash}`);
    await _addLiquidityETH();

    console.log(`Contract Address of Uniswap Pair Contract: ${uniswapV2Pair.target}`);
    pair = await uniswapV2Factory.getPair(tokenA.target, weth.target);
    console.log(`Pair Address Of Token/Weth via Factory: ${pair}`);
    let uniswapV2PairAt = await uniswapV2Pair.connect(signer[0]).attach(pair);
    let liquidity = await uniswapV2PairAt.balanceOf(signer[0].address);
    console.log(`Liquidity After addLiquidityETH Function : ${liquidity}`);
    console.log(`Reserve After addLiquidityETH: ${await uniswapV2PairAt.getReserves()}`);

    await uniswapV2PairAt.connect(signer[0]).approve(uniswapV2Router02.target, liquidity);
    await uniswapV2Router02.connect(signer[0]).removeLiquidityETH(tokenA.target,liquidity,1,1,signer[1].address,deadline);
    console.log(`Liquidity After removeLiquidityETH Function : ${await uniswapV2PairAt.balanceOf(signer[1].address)}`);
    console.log(`Reserve After removeLiquidityETH: ${await uniswapV2PairAt.getReserves()}`);
  });
  it("swapExactTokensForTokens function", async function () {                
    await _addLiquidity();

    console.log(`Contract Address of Uniswap Pair Contract: ${uniswapV2Pair.target}`);
    pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    console.log(`Pair Address Of TokenA/TokenB via Factory: ${pair}`);
    let uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
    // let liquidity = await uniswapV2PairAt.balanceOf(signer[0].address);
    let liquidity =await uniswapV2PairAt.balanceOf(signer[0].address);
    console.log(`Liquidity After addLiquidity Function : ${liquidity}`);
    console.log(`Reserve After addLiquidity: ${(await uniswapV2PairAt.getReserves())}`);
    await uniswapV2PairAt.connect(signer[0]).approve(uniswapV2Router02.target, liquidity);
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target,TOKEN_A_AMOUNT);
    let iniBalT1 = await tokenA.balanceOf(signer[0].address);
    let iniBalT2 = await tokenB.balanceOf(signer[0].address);
    // const amountIn = ethers.parseEther("100");
    await uniswapV2Router02.connect(signer[0]).swapExactTokensForTokens(amountIn,1,[tokenA.target,tokenB.target],signer[0].address, deadline);

    console.log(`Liquidity After swap Function : ${liquidity}`);
    console.log(`Reserve After swap: ${(await uniswapV2PairAt.getReserves())}`);

    let fnlBalT1 = await tokenA.balanceOf(signer[0].address);
    let fnlBalT2 = await tokenB.balanceOf(signer[0].address);
    // let fnlBalT3 = await tokenA.balanceOf(signer[4].address);
    expect(iniBalT1).to.be.greaterThan(fnlBalT1);
    expect(fnlBalT2).to.be.greaterThan(iniBalT2);
    // expect(fnlBalT3).to.equal(0.3);
    console.log(`
    Initial Balance of Token A : ${iniBalT1}
    Initial Balance of Token B : ${iniBalT2}
    Final Balance of Token A   : ${fnlBalT1}
    Final Balance of Token B   : ${fnlBalT2}
    `);
    // await _addLiquidity();
    // console.log(`Contract Address of Uniswap Pair Contract: ${uniswapV2Pair.target}`);
    // pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    // console.log(`Pair Address Of TokenA/TokenB via Factory: ${pair}`);
    // uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
    // // let liquidity = await uniswapV2PairAt.balanceOf(signer[0].address);
    //  liquidity =await uniswapV2PairAt.balanceOf(signer[0].address);
    // console.log(`Liquidity After addLiquidity Function : ${liquidity}`);
    // console.log(`Reserve After addLiquidity: ${(await uniswapV2PairAt.getReserves())}`);
    // iniBalT1 = await tokenA.balanceOf(signer[0].address);
    // iniBalT2 = await tokenB.balanceOf(signer[0].address);
    // console.log(`
    // Initial Balance of Token A : ${iniBalT1}
    // Initial Balance of Token B : ${iniBalT2}
    // `);
  });
  it("swapTokensForExactTokens", async ()=>{
    await _addLiquidity();

    // console.log(`Contract Address of Uniswap Pair Contract: ${uniswapV2Pair.target}`);
    // pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    // console.log(`Pair Address Of TokenA/TokenB via Factory: ${pair}`);
    // let uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
    // // let liquidity = await uniswapV2PairAt.balanceOf(signer[0].address);
    // let liquidity =await uniswapV2PairAt.balanceOf(signer[0].address);
    // console.log(`Liquidity After addLiquidity Function : ${liquidity}`);
    // console.log(`Reserve After addLiquidity: ${(await uniswapV2PairAt.getReserves())}`);
    // await uniswapV2PairAt.connect(signer[0]).approve(uniswapV2Router02.target, liquidity);
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target,TOKEN_A_AMOUNT);
    let iniBalT1 = await tokenA.balanceOf(signer[0].address);
    let iniBalT2 = await tokenB.balanceOf(signer[0].address);
     amountOut=ethers.parseEther("10");
    await uniswapV2Router02.connect(signer[0]).swapTokensForExactTokens(amountOut,TOKEN_A_AMOUNT,[tokenA.target,tokenB.target],signer[0].address, deadline);

    // console.log(`Liquidity After swap Function : ${liquidity}`);
    // console.log(`Reserve After swap: ${(await uniswapV2PairAt.getReserves())}`);

    let fnlBalT1 = await tokenA.balanceOf(signer[0].address);
    let fnlBalT2 = await tokenB.balanceOf(signer[0].address);
    console.log(`
    Initial Balance of Token A : ${iniBalT1}
    Initial Balance of Token B : ${iniBalT2}
    Final Balance of Token A  : ${fnlBalT1}
    Final Balance of Token B  : ${fnlBalT2}
    `);
  })
  it("swapExactETHForTokens",async ()=>{
    await _addLiquidityETH();

    pair = await uniswapV2Factory.getPair(tokenA.target, weth.target);
    console.log(`Pair Address Of TokenA/weth via Factory: ${pair}`);
    let uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
    let iniBalT1 = ((await tokenA.balanceOf(signer[0].address)));
    console.log(`Reserve Before swap: ${(await uniswapV2PairAt.getReserves())}`);
    await uniswapV2Router02.connect(signer[0]).swapExactETHForTokens(1,[weth.target,tokenA.target],signer[0].address, deadline,{value:ETH_AMOUNT});

    let fnlBalT1 = ((await tokenA.balanceOf(signer[0].address)));
    console.log(`
    Initial Balance of Token A : ${iniBalT1}
    Final Balance of Token A  : ${fnlBalT1}
    `);
    console.log(`Reserve After swap: ${(await uniswapV2PairAt.getReserves())}`);
  })
  // it("swapTokensForExactETH",async ()=>{
  //   await _addLiquidityETH();

  //   pair = await uniswapV2Factory.getPair(tokenA.target, weth.target);
  //   console.log(`Pair Address Of TokenA/weth via Factory: ${pair}`);
  //   let uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
  //   let iniBalT1 = ((await tokenA.balanceOf(signer[0].address)));
  //   console.log(`Reserve Before swap: ${(await uniswapV2PairAt.getReserves())}`);
  //   amountOut=ethers.parseEther("10");
  //   await tokenA.connect(signer[0]).approve(uniswapV2Router02.target,amountInMax);
  //   await uniswapV2Router02.connect(signer[0]).swapTokensForExactETH(
  //     amountOut, amountInMax, [tokenA.target,weth.target], signer[0].address, deadline
  //   )
  //   let fnlBalT1 = ((await tokenA.balanceOf(signer[0].address)));
  //   console.log(`
  //   Initial Balance of Token A : ${iniBalT1}
  //   Final Balance of Token A  : ${fnlBalT1}
  //   `);
  //   console.log(`Reserve After swap: ${(await uniswapV2PairAt.getReserves())}`);
  // })
  it("swapTokensForExactETH function", async function () {
    await _addLiquidityETH();

    pair = await uniswapV2Factory.getPair(tokenA.target, weth.target);
    console.log(`Pair Address Of TokenA/weth via Factory: ${pair}`);
    let uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
    console.log(`Reserve Before swap: ${(await uniswapV2PairAt.getReserves())}`);
    let iniBalToken =await tokenA.balanceOf(signer[0].address);
    // amountOut=ethers.parseEther("10");
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target,amountInMax);
    await uniswapV2Router02.connect(signer[0]).swapTokensForExactETH(amountOut,amountInMax,[tokenA.target,weth.target],signer[0].address,deadline);

    let fnlBalToken =await tokenA.balanceOf(signer[0].address);
    console.log(`
      Initial Balance of Token A : ${iniBalToken}
      Final Balance of Token A  : ${fnlBalToken}
    `);
    console.log(`Reserve After swap: ${(await uniswapV2PairAt.getReserves())}`);
  });
  it("swapExactTokensForETH function", async function () {
    await _addLiquidityETH();
    
    pair = await uniswapV2Factory.getPair(tokenA.target, weth.target);
    console.log(`Pair Address Of TokenA/weth via Factory: ${pair}`);
    let uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
    console.log(`Reserve Before swap: ${(await uniswapV2PairAt.getReserves())}`);
    let iniBalToken = ((await tokenA.balanceOf(signer[0].address)));
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target,amountInMax);
    // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
    await uniswapV2Router02.connect(signer[0]).swapExactTokensForETH(amountInMax,amountOut,[tokenA.target,weth.target],signer[0].address,deadline);

    let fnlBalToken = ((await tokenA.balanceOf(signer[0].address)));
    console.log(`
      Initial Balance of Token A : ${iniBalToken}
      Final Balance of Token A  : ${fnlBalToken}
    `);
    console.log(`Reserve After swap: ${(await uniswapV2PairAt.getReserves())}`);
  });
  it("swapETHForExactTokens function", async function () {
    await _addLiquidityETH();
    
    pair = await uniswapV2Factory.getPair(tokenA.target, weth.target);
    console.log(`Pair Address Of TokenA/weth via Factory: ${pair}`);
    let uniswapV2PairAt =await uniswapV2Pair.connect(signer[0]).attach(pair);
    console.log(`Reserve Before swap: ${(await uniswapV2PairAt.getReserves())}`);
    let iniBalToken = await tokenA.balanceOf(signer[0].address);
    await tokenA.connect(signer[0]).approve(uniswapV2Router02.target,TOKEN_A_AMOUNT);
    // (uint amountOut, address[] calldata path, address to, uint deadline)
    amountOut=ethers.parseEther("1");
    await uniswapV2Router02.connect(signer[0]).swapETHForExactTokens(amountOut,[weth.target,tokenA.target],signer[0].address,deadline,{value:amountIn});

    let fnlBalToken = await tokenA.balanceOf(signer[0].address);
    console.log(`
      Initial Balance of Token A : ${iniBalToken}
      Final Balance of Token A  : ${fnlBalToken}
    `);
    console.log(`Reserve After swap: ${(await uniswapV2PairAt.getReserves())}`);
  });
});
