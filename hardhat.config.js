/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox');
module.exports = {
  solidity: '0.8.0',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
