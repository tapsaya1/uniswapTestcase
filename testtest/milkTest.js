// const ethers = require('ethers');
// const provider = new ethers.providers.JsonRpcProvider('https://rpc-devnet-cardano-evm.c1.milkomeda.com/');
// const abi = [
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_factory",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "_WETH",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [],
//       "name": "WETH",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "tokenA",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "tokenB",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountADesired",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountBDesired",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountAMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountBMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "addLiquidity",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountA",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountB",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "token",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountTokenDesired",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountTokenMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETHMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "addLiquidityETH",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountToken",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETH",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "factory",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOut",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "reserveIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "reserveOut",
//           "type": "uint256"
//         }
//       ],
//       "name": "getAmountIn",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountIn",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "reserveIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "reserveOut",
//           "type": "uint256"
//         }
//       ],
//       "name": "getAmountOut",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOut",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "pure",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOut",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         }
//       ],
//       "name": "getAmountsIn",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         }
//       ],
//       "name": "getAmountsOut",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountA",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "reserveA",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "reserveB",
//           "type": "uint256"
//         }
//       ],
//       "name": "quote",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountB",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "pure",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "tokenA",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "tokenB",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountAMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountBMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "removeLiquidity",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountA",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountB",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "token",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountTokenMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETHMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "removeLiquidityETH",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountToken",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETH",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "token",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountTokenMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETHMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountETH",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "token",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountTokenMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETHMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bool",
//           "name": "approveMax",
//           "type": "bool"
//         },
//         {
//           "internalType": "uint8",
//           "name": "v",
//           "type": "uint8"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "r",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "s",
//           "type": "bytes32"
//         }
//       ],
//       "name": "removeLiquidityETHWithPermit",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountToken",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETH",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "token",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountTokenMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountETHMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bool",
//           "name": "approveMax",
//           "type": "bool"
//         },
//         {
//           "internalType": "uint8",
//           "name": "v",
//           "type": "uint8"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "r",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "s",
//           "type": "bytes32"
//         }
//       ],
//       "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountETH",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "tokenA",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "tokenB",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "liquidity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountAMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountBMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bool",
//           "name": "approveMax",
//           "type": "bool"
//         },
//         {
//           "internalType": "uint8",
//           "name": "v",
//           "type": "uint8"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "r",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "s",
//           "type": "bytes32"
//         }
//       ],
//       "name": "removeLiquidityWithPermit",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountA",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountB",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOut",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapETHForExactTokens",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOutMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapExactETHForTokens",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOutMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountOutMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapExactTokensForETH",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountOutMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountOutMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapExactTokensForTokens",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountIn",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountOutMin",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOut",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountInMax",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapTokensForExactETH",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amountOut",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountInMax",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address[]",
//           "name": "path",
//           "type": "address[]"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "swapTokensForExactTokens",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "amounts",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "stateMutability": "payable",
//       "type": "receive"
//     }
//   ];
// const UniContract = new ethers.Contract('0x8e7C146F2439020000db8499EFd37230ca10FeF0',abi,provider);


// const tokenAAddress = '0x05A5c3b6d51afc4dAcc0270B2Dc83FC049E46a5c';
// const tokenAAbi = [
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "allowance",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "decimals",
// 		"outputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "subtractedValue",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "decreaseAllowance",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "addedValue",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "increaseAllowance",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_add",
// 				"type": "address"
// 			}
// 		],
// 		"name": "mint",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "name",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ];
// const tokenBAddress = '0x2d9D564d01c16632a5c95627722177B1DbD258b7';
// const tokenBAbi = [
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "allowance",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "decimals",
// 		"outputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "subtractedValue",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "decreaseAllowance",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "addedValue",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "increaseAllowance",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_add",
// 				"type": "address"
// 			}
// 		],
// 		"name": "mint",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "name",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ]

// const tokenAContract = new ethers.Contract(tokenAAddress,tokenAAbi,provider);
// const tokenBContract = new ethers.Contract(tokenBAddress,tokenBAbi,provider);

// // const TOKEN_A_AMOUNTU = 10000;
// // const TOKEN_B_AMOUNTU = 10000;

// const TOKEN_A_AMOUNT = ethers.utils.parseEther("1");

// // network: using the Rinkeby testnet
// // let network = 'rinkeby'
// // // provider: Infura or Etherscan will be automatically chosen
// // let provider = ethers.getDefaultProvider(network)
// // Sender private key: 
// // correspondence address 0xb985d345c4bb8121cE2d18583b2a28e98D56d04b
// // let privateKey = '9a8c298024920de6c188d41ccdf3bedbf4565498489f919af6b3ed93fe1386e9'
// let privateKey = '1aa00af2249c90ddef8565fb073e682e361699fd802b46b2efc867198ffbc71c'
// // Create a wallet instance
// let wallet = new ethers.Wallet(privateKey, provider)

// async function main(){
//   let gas;
//   // console.log(await tokenAContract.balanceOf(wallet.address));
//   // console.log(await tokenBContract.balanceOf(wallet.address));
//   // console.log(UniContract);
//   let acc = '0x63497E46b692dD68Bd19c5d274423971FBb2E628';
  
//   await tokenAContract.connect(wallet).mint('0x63497E46b692dD68Bd19c5d274423971FBb2E628',{gasLimit:500000});
//   await tokenBContract.connect(wallet).mint('0x63497E46b692dD68Bd19c5d274423971FBb2E628',{gasLimit:500000});
//   console.log(wallet.address)
//   // // // console.log(tokenAContract.address);
//   // // console.log(tokenBContract.address);
//   // // let acc = '0xce0cC7Edc302B2026A87a2e2C83F3Cd47A185412';




//   // console.log((Number(await tokenAContract.balanceOf(acc)))/1e18,"tokenA bal");
//   // console.log((Number(await tokenBContract.balanceOf(acc)))/1e18,"tokenb bal");



// // console.log(UniContract.address);

//   // await tokenAContract.connect(wallet).approve(UniContract.address,TOKEN_A_AMOUNT);
//   // await tokenBContract.connect(wallet).approve(UniContract.address,TOKEN_A_AMOUNT);
//   console.log(TOKEN_A_AMOUNT)

//   // console.log(await tokenAContract.allowance('0x26e087EF4aBCfB35D950dE96e548fd849E753470','0x8e7C146F2439020000db8499EFd37230ca10FeF0'))
//   // // // console.log(await UniContract.WETH());
  
//   // await UniContract.connect(wallet).addLiquidity(tokenAAddress,tokenBAddress,TOKEN_A_AMOUNT,TOKEN_A_AMOUNT,1,1,wallet.address,1765494095);
//   // provider.estimateGas(tx).then((gasLimit) => {
//   //   gas = gasLimit;
//   // });
//   // await tx.wait();
// }

// main();