describe("removeLiquiditywithPermit And removeLiquidityETHWithPermit", () => {
    it.only("removeLiquidityWithPermit", async() => {
    const deadLine = ethers.constants.MaxUint256;
    await myToken.connect(owner).mint(addr1.address,expandTo18Decimals(10000));
    await simpalToken.connect(owner).mint(addr1.address,expandTo18Decimals(10000));
    await myToken.connect(addr1).approve(uniswapV2Router02.address,expandTo18Decimals(4000));
    await simpalToken.connect(addr1).approve(uniswapV2Router02.address,expandTo18Decimals(5000));
    await uniswapV2Router02.connect(addr1).addLiquidity(myToken.address,simpalToken.address,expandTo18Decimals(200),expandTo18Decimals(200),expandTo18Decimals(1),expandTo18Decimals(1),owner.address,deadLine);
    
    let TokenPair = await _factory.getPair(myToken.address,simpalToken.address);
    let pairAttach = await uniswapV2Pair.attach(TokenPair);

    const uniswapName = await uniswapV2ERC20.name();
    let point = await pairAttach.getReserves();
    // await point._reserve0;
    // console.log("Reserve A:", point._reserve0);
    // await point._reserve1;
    // console.log("Reserve B:", point._reserve1);

    const liquidity = await pairAttach.balanceOf(owner.address);

    console.log (liquidity ,"---> LP liquidity value");
    
    const signatureDigest = await owner._signTypedData( 
                {
                  name : await pairAttach.name(),
                  version :"1",
                  chainId : "0",
                  verifyingContract: pairAttach.address,

                }, 
                {   
                    Permit: [
                      {
                        name: 'owner',
                        type: 'address',
                      },
                      {
                        name: 'spender',
                        type: 'address',
                      },
                      {
                        name: 'value',
                        type: 'uint256',
                      },
                      {
                        name: 'nonce',
                        type: 'uint256',
                      },
                      {
                        name: 'deadline',
                        type: 'uint256',
                      },
                    ],
                  },
                  {
                    owner: owner.address,
                    spender: uniswapV2Router02.address,
                    value: liquidity,
                    nonce: await pairAttach.nonces(owner.address),
                    deadline:deadLine,
                
                  });
                  const signatureSplit = await ethers.utils.splitSignature(signatureDigest);
                  console.log(signatureSplit ,"split value");
                  
                  await uniswapV2Router02.connect(owner).removeLiquidityWithPermit(myToken.address,simpalToken.address,
                  liquidity,expandTo18Decimals(1),expandTo18Decimals(1),owner.address,deadLine,false, 
                  signatureSplit.v, signatureSplit.r,signatureSplit.s,{gasLimit:3000000})               
                    
    });

});
