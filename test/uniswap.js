const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("check all functions of Router2", async () => {
  let tokenA;
  let tokenB;
  let weth9;
  let uniswapV2Factory;
  let owner;
  let uniswapRouter;
  let parseEther;
  let calHash;
  let getpair;
  let uniswapV2PairContract;
  let secondPerson;
  // let swap_wala_pair;
  console.log("thi si s sjcbsakjcb");
  beforeEach(async () => {
    console.log("this i s nin");
    owner = await ethers.getSigners();
    secondPerson = owner[1];
    // await ethers.getSigners();
    console.log("Owner Address : ", owner[0].address);

    const tokenAContract = await ethers.getContractFactory("TokenA");
    tokenA = await tokenAContract.connect(owner[0]).deploy();
    console.log("Token A Contract Address : ", tokenA.target);

    const tokenBContract = await ethers.getContractFactory("TokenB");
    tokenB = await tokenBContract.connect(owner[0]).deploy();
    console.log("Token B Contract Address : ", tokenB.target);

    const WETH = await ethers.getContractFactory("WETH9");
    weth9 = await WETH.connect(owner[0]).deploy();
    console.log("Weth9 Contract Address : ", weth9.target);

    const UniswapV2Factory = await ethers.getContractFactory(
      "UniswapV2Factory"
    );
    uniswapV2Factory = await UniswapV2Factory.connect(owner[0]).deploy(
      owner[0].address
    );
    console.log(
      "UniswapV2Factory Contract Address  : ",
      uniswapV2Factory.target
    );

    const UniswapV2Router02Contracts = await ethers.getContractFactory(
      "UniswapV2Router02"
    );
    uniswapRouter = await UniswapV2Router02Contracts.connect(owner[0]).deploy(
      uniswapV2Factory.target,
      weth9.target
    );
    console.log("niswapRouter Contract Address : ", uniswapRouter.target);

    const CalHash = await ethers.getContractFactory("CalHash");
    calHash = await CalHash.connect(owner[0]).deploy();
    console.log("initHash Contract Address : ", await calHash.getInitHash());

    const pairContract = await ethers.getContractFactory("UniswapV2Pair");
    uniswapV2PairContract = await pairContract.connect(owner[0]).deploy();
  });

  it("check callhash", async function () {
    const getHash = await calHash.getInitHash();
    console.log("gethash address : ", getHash);
  });

  //setep1>deploy(weth9)
  //give tokenA and tokenB apprroval to the router
  //setep2>deploy (tokenA)
  //setep3>deploy(tokenB)
  //setep4>deploy(factory)
  //setep5>deploy(v2Router)
  //open v2Router and click on liquidity
  //give approval to the (tokenA a) and (tokenB),than fill on the params
  //than give amountDesire both
  //then give amountMin both
  //give owner address
  //give deadline to (epoch time sptamp)

  it("check addliquidity", async function () {
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("100"));
    await tokenB.approve(uniswapRouter.target, ethers.parseEther("100"));
    console.log(
      "Before AddLiquidity Balance of Token A to Owner",
      await tokenA.connect(owner[0]).balanceOf(owner[0].address)
    );
    console.log(
      "Before AddLiquidity Balance of Token B to Owner",
      await tokenB.connect(owner[0]).balanceOf(owner[0].address)
    );

    console.log("yes1");

    await uniswapRouter.addLiquidity(
      tokenA.target,
      tokenB.target,
      ethers.parseEther("50"),
      ethers.parseEther("50"),
      ethers.parseEther("0"),
      ethers.parseEther("0"),
      owner[0].address,
      1727504325
    );
    console.log("yes1");

    const pair = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    console.log("pairaddress ==>", pair);

    let PairAttach = await uniswapV2PairContract.connect(owner[0]).attach(pair);
    console.log("liquidity", await PairAttach.balanceOf(owner[0].address));
    console.log("reserves==>", await PairAttach.getReserves());

    const Deposite = await PairAttach.getReserves();
    console.log("deposite zero place value==>", await Deposite[0]);
    expect(Deposite[0]).to.be.equal(ethers.parseEther("50"));
    console.log(
      "After : Balance of Token A to Owner",
      await tokenA.connect(owner[0]).balanceOf(owner[0].address)
    );
    console.log(
      "After : Balance of Token B to Owner",
      await tokenB.connect(owner[0]).balanceOf(owner[0].address)
    );
  });
  //setep1>deploy(weth9)
  //setep2>deploy (tokenA)
  //setep3>deploy(tokenB)
  //setep4>deploy(factory)
  //setep5>deploy(v2Router)
  //open v2Router and click on liquidity
  //give approval to    v2router of (tokenA a) and (tokenB),than fill on the params
  //give amount of remove liquidity
  //give owner address
  //give deadline to (epoch time sptamp)
  //setep1>same to same addliquidity seteps follow
  //setep2>give approve to the pair of the V2Router
  it("check removeliquidity", async function () {
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("500"));
    await tokenB.approve(uniswapRouter.target, ethers.parseEther("500"));
    console.log(
      "Before removeLiquidity Balance of tokenA to owner",
      tokenA.connect(owner[0]).balanceOf(owner[0].address)
    );
    console.log(
      "Before removeLiquidity Balance of tokenB to owner",
      tokenB.connect(owner[0]).balanceOf(owner[0].address)
    );

    await uniswapRouter.addLiquidity(
      tokenA.target,
      tokenB.target,
      ethers.parseEther("500"),
      ethers.parseEther("500"),
      ethers.parseEther("0"),
      ethers.parseEther("0"),
      owner[0].address,
      1759485870
    );

    const pairs = await uniswapV2Factory.getPair(tokenA.target, tokenB.target);
    console.log("address of pair==>", pairs);

    let Attach_Pair = await uniswapV2PairContract
      .connect(owner[0])
      .attach(pairs);
    let liquidity_value = await Attach_Pair.balanceOf(owner[0].address);
    console.log("liquidity", liquidity_value);

    await Attach_Pair.approve(uniswapRouter.target, ethers.parseEther("200"));
    await uniswapRouter.removeLiquidity(
      tokenA.target,
      tokenB.target,
      ethers.parseEther("100"),
      ethers.parseEther("0"),
      ethers.parseEther("0"),
      owner[0].address,
      1759485870
    );

    let liquidity_Remove_value = await Attach_Pair.balanceOf(owner[0].address);
    console.log("Remain value", liquidity_Remove_value);
    expect(liquidity_Remove_value).to.be.lessThan(liquidity_value);
    console.log(
      "After removeLiquidity Balance of tokenA to owner",
      tokenA.connect(owner[0]).balanceOf(owner[0].address)
    );
    console.log(
      "After removeLiquidity Balance of tokenB to owner",
      tokenB.connect(owner[0]).balanceOf(owner[0].address)
    );
  });

  it("check addliquidityETH", async function () {
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("100"));
    console.log("enter1");
    await uniswapRouter
      .connect(owner[0])
      .addLiquidityETH(
        tokenA.target,
        ethers.parseEther("100"),
        0,
        0,
        owner[0].address,
        1759485870,
        { value: ethers.parseEther("60") }
      );
    console.log("enter2");

    const Ethpair = await uniswapV2Factory.getPair(tokenA.target, weth9.target);
    console.log("eth pair addess", Ethpair);

    let Ethpairs = await uniswapV2PairContract
      .connect(owner[0])
      .attach(Ethpair);
    console.log("liquidity", await Ethpairs.balanceOf(owner[0].address));

    const adding = await Ethpairs.getReserves();
    console.log(adding);
    console.log("adding zero place value", adding[1]);
    expect(adding[1]).to.be.equal(ethers.parseEther("60"));
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("check removeliqiudityEth", async function () {
    console.log("enter==>1");
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("300"));

    await uniswapRouter
      .connect(owner[0])
      .addLiquidityETH(
        tokenA.target,
        ethers.parseEther("200"),
        ethers.parseEther("0"),
        ethers.parseEther("0"),
        owner[0].address,
        1759731917,
        { value: ethers.parseEther("50") }
      );
    console.log("enter==>2");

    const E_pair = await uniswapV2Factory.getPair(tokenA.target, weth9.target);

    console.log("enter==>3 ", E_pair);
    //attach the pair address with contract
    let AttachPairCAll = await uniswapV2PairContract
      .connect(owner[0])
      .attach(E_pair);
    console.log("pairCall address==>", AttachPairCAll.target);

    const Adding = await AttachPairCAll.getReserves();
    console.log("reserves 1", Adding);
    console.log("liquidity", await AttachPairCAll.balanceOf(owner[0].address));
    expect(await AttachPairCAll.balanceOf(owner[0].address)).to.be.equal(
      ethers.parseEther("99.999999999999999")
    );
    // expect(await AttachPairCAll.balanceOf(owner[0].address)).to.be.equal(await AttachPairCAll.balanceOf(owner[0].address))
    console.log("enter4");

    await AttachPairCAll.approve(
      uniswapRouter.target,
      ethers.parseEther("100")
    );
    await uniswapRouter.removeLiquidityETH(
      tokenA.target,
      ethers.parseEther("50"),
      ethers.parseEther("1"),
      ethers.parseEther("1"),
      owner[0].address,
      1759731917
    );
    console.log("enter==>5");
    let removeliqiudityEth_balance = await AttachPairCAll.getReserves();
    console.log("balance==> ", removeliqiudityEth_balance);
    expect(await Adding).to.be.lessThan, removeliqiudityEth_balance;
    console.log("enter6");
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("check addliquidity by first person", async function () {
    await tokenA
      .connect(owner[0])
      .approve(uniswapRouter.target, ethers.parseEther("200"));
    await tokenB
      .connect(owner[0])
      .approve(uniswapRouter.target, ethers.parseEther("200"));

    await uniswapRouter
      .connect(owner[0])
      .addLiquidity(
        tokenA.target,
        tokenB.target,
        ethers.parseEther("200"),
        ethers.parseEther("200"),
        ethers.parseEther("1"),
        ethers.parseEther("1"),
        owner[0].address,
        1759731917
      );
    console.log("first person liquidity");

    await tokenA
      .connect(owner[0])
      .transfer(owner[1].address, ethers.parseEther("500"));
    await tokenB
      .connect(owner[0])
      .transfer(owner[1].address, ethers.parseEther("500"));

    await tokenA
      .connect(owner[1])
      .approve(uniswapRouter.target, ethers.parseEther("500"));
    await tokenB
      .connect(owner[1])
      .approve(uniswapRouter.target, ethers.parseEther("500"));
    await uniswapRouter
      .connect(owner[1])
      .addLiquidity(
        tokenA.target,
        tokenB.target,
        ethers.parseEther("400"),
        ethers.parseEther("400"),
        ethers.parseEther("1"),
        ethers.parseEther("1"),
        owner[0].address,
        1759731917
      );
    console.log("enter==>two person liquidity");

    // get Resserve karne ke liye ye process hai=======>
    //uniswapV2Factory me getPair hai
    //getPair me  2 token daal kar .... uska ek pair niklega ....
    //usko new variable me store karna hai
    //console kr ke dekhlo aage
    const AB_pair = await uniswapV2Factory.getPair(
      tokenA.target,
      tokenB.target
    );
    console.log("getPair both address==>", AB_pair);

    //getPair ka jo new variable assing kiya hai usko attached karna hai uniswapv2contract ke sath
    // attched ke time .connect(owner[0]) krna hai
    // than usko store krna hai ==>new variable me
    //ab wo pair new variables me agya ...
    //than usse variable.getReserve kro ...inke fanctionality nikl rhi h isko new variable me store
    //kro
    // console lga kr dekho

    let attach_wala_pair = await uniswapV2PairContract
      .connect(owner[0])
      .attach(AB_pair);
    let reserveOFpair = await attach_wala_pair.getReserves();
    console.log("reserve of this pair", reserveOFpair);
  });
  //(1)
  // weth9 ko deploy kiya
  // tokena ko deploy kiya
  // tokenB ko deply kiya
  // uniswapv2factory ko deploy kiya
  // uniswapv2Router ko deploy kiya
  //(2)
  //Router ko tokenA and token B ka approval diya ....hemesa approve maximum dena chaihiye becouse
  //token se addliquidity krane ke baad swapExactTokensForTokens ke liye approval bachna chahiye
  //uniswapv2 me addliquidity function kro
  //addliquidity ka sara function fill kro
  // console kro
  //(3)
  //swapExactTokensForToken ke sare parameter fill kro
  //amountIn==> me swap krne ke liye amount dalo
  //amountoutmin==>1
  //path me dono addresses daala hai array ke amdr ["TokenA.target","TokenB.target"]
  //(owner[0].address) dalna hai
  //deadline daali hai
  it("check swapExactTokenForToken", async function () {
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("2000"));
    await tokenB.approve(uniswapRouter.target, ethers.parseEther("2000"));

    await uniswapRouter.addLiquidity(
      tokenA.target,
      tokenB.target,
      ethers.parseEther("1000"),
      ethers.parseEther("1000"),
      ethers.parseEther("1"),
      ethers.parseEther("1"),
      owner[0].address,
      1759731917
    );
    console.log("enter swap==>1");

    // await tokenA.approve(uniswapRouter.target,ethers.parseEther("1000"));

    await uniswapRouter
      .connect(owner[0])
      .swapExactTokensForTokens(
        ethers.parseEther("100"),
        ethers.parseEther("0"),
        [tokenA.target, tokenB.target],
        owner[0].address,
        1759731917
      );
    console.log("enter swap===>2");

    // get Resserve karne ke liye ye proess hai=======>
    //uniswapV2Factory me getPair hai
    //getPair me  2 token daal kar .... uska ek pair niklega ....
    //usko new variable me store karna hai
    //console kr ke dekhlo aage
    //end
    //end
    //end
    let swap_pair = await uniswapV2Factory.getPair(
      tokenA.target,
      tokenB.target
    );
    console.log("address of swap pair", swap_pair);

    //(1)
    // weth9 ko deploy kiya
    // tokena ko deploy kiya
    // tokenB ko deply kiya
    // uniswapv2factory ko deploy kiya
    // uniswapv2Router ko deploy kiya
    //(2)
    //Router ko tokenA and token B ka approval diya ....hemesa approve maximum dena chaihiye becouse
    //token se addliquidity krane ke baad swapExactTokensForTokens ke liye approval bachna chahiye
    //uniswapv2 me addliquidity function kro
    //addliquidity ka sara function fill kro
    // console kro
    //(3)
    //swapExactTokensForToken ke sare parameter fill kro
    //amountIn==> me swap krne ke liye amount dalo
    //amountoutmin==>1
    //path me dono addresses daala hai array ke amdr ["TokenA.target","TokenB.target"]
    //(owner[0].address) dalna hai
    //deadline daali hai
    //end
    //end
    //end

    let swap_wala_pair = await uniswapV2PairContract
      .connect(owner[0])
      .attach(swap_pair);
    let swapPairReserver = await swap_wala_pair.getReserves();
    console.log("check resesver of swapPairReserves", swapPairReserver);
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it.only("check swapExactETHForTokens", async function () {
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("3000"));
    console.log("swap eth==>1");
    await uniswapRouter
      .connect(owner[0])
      .addLiquidityETH(
        tokenA.target,
        ethers.parseEther("2000"),
        ethers.parseEther("1"),
        ethers.parseEther("1"),
        owner[0].address,
        1759731917,
        { value: ethers.parseEther("20") }
      );
    console.log("swapETH==>1");
    await uniswapRouter
      .connect(owner[0])
      .swapExactETHForTokens(
        ethers.parseEther("1"),
        [weth9.target, tokenA.target],
        owner[0].address,
        1759731917,
        { value: ethers.parseEther("2") }
      );
    console.log("swapETH==>2");

    // get Resserve karne ke liye ye proess hai=======>
    //uniswapV2Factory me getPair hai
    //getPair me  2 token daal kar .... uska ek pair niklega ....
    //usko new variable me store karna hai
    //console kr ke dekhlo aage
    let swapForToken_pair = await uniswapV2Factory.getPair(
      weth9.target,
      tokenA.target
    );
    console.log("address of swapExactETH pair", swapForToken_pair);

    //(1)
    // weth9 ko deploy kiya
    // tokena ko deploy kiya
    // tokenB ko deply kiya
    // uniswapv2factory ko deploy kiya
    // uniswapv2Router ko deploy kiya
    //(2)
    //Router ko tokenA and token B ka approval diya ....hemesa approve maximum dena chaihiye becouse
    //token se addliquidity krane ke baad swapExactTokensForTokens ke liye approval bachna chahiye
    //uniswapv2 me addliquidity function kro
    //addliquidity ka sara function fill kro
    // console kro
    //(3)
    //swapExactTokensForToken ke sare parameter fill kro
    //amountIn==> me swap krne ke liye amount dalo
    //amountoutmin==>1
    //path me dono addresses daala hai array ke amdr ["TokenA.target","TokenB.target"]
    //(owner[0].address) dalna hai
    //deadline daali hai
    let swapForToken_wala_pair = await uniswapV2PairContract
      .connect(owner[0])
      .attach(swapForToken_pair);
    let swapForToken_PairReserver = await swapForToken_wala_pair.getReserves();
    console.log(
      "check resesver of swapPairReserves",
      swapForToken_PairReserver
    );
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////

  it("check swapTokensForExactETH", async function () {
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("100"));
    console.log("enter1");
    await uniswapRouter
      .connect(owner[0])
      .addLiquidityETH(
        tokenA.target,
        ethers.parseEther("100"),
        0,
        0,
        owner[0].address,
        1759485870,
        { value: ethers.parseEther("20") }
      );

    console.log("swapExact===>1");
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("100"));
    await uniswapRouter
      .connect(owner[0])
      .swapTokensForExactETH(
        ethers.parseEther("2"),
        ethers.parseEther("50"),
        [tokenA.target, weth9.target],
        owner[0].address,
        1759485870
      );
    console.log("swapExact==>2");

    let swapExactETH_pair = await uniswapV2Factory.getPair(
      weth9.target,
      tokenA.target
    );
    console.log("address of swapExactETH pair", swapExactETH_pair);

    let swapExactETH_wala_pair = await uniswapV2PairContract
      .connect(owner[0])
      .attach(swapExactETH_pair);
    let swapETH_PairReserver = await swapExactETH_wala_pair.getReserves();
    console.log("check resesver of swapPairReserves", swapETH_PairReserver);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it.only("check swapTokensForExactTokens", async function () {
    await tokenA.approve(uniswapRouter.target, ethers.parseEther("100"));
    console.log("enter1");
    await uniswapRouter
      .connect(owner[0])
      .addLiquidityETH(
        tokenA.target,
        ethers.parseEther("100"),
        0,
        0,
        owner[0].address,
        1759485870,
        { value: ethers.parseEther("20") }
      );
    console.log("exactToken==>1");

    await tokenA.approve(uniswapRouter.target, ethers.parseEther("100"));
    await uniswapRouter
      .connect(owner[0])
      .swapTokensForExactTokens(
        ethers.parseEther("2"),
        ethers.parseEther("50"),
        [tokenA.target, weth9.target],
        owner[0].address,
        1759485870
      );
  });
  console.log("ExactToken==>2");
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
