---
title: Hardhat-部署合约到测试网络
category: web3
tags: [solidity, hardhat]
publishedAt: 2024-01-25
description: 部署合约到Sepolia测试网络，并加密敏感配置项
---


# 部署合约到测试网络

## 1. 创建一个测试应用

使用`sepolia`测试网络进行部署：
创建一个测试应用：[https://dashboard.alchemy.com/apps](https://dashboard.alchemy.com/apps)
- Chain: Ethereum
- Network: Sepolia

## 配置`hardhat.config.js`
```js
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
	  // app Network url
      url: "https://eth-sepolia.g.alchemy.com/v2/sP-SwrbweN2Ht25-VQWF8P33XMLCcv-O",
      // test account private key
      accounts: ["*************"]
    },
  },
};
```

## 3. 执行部署
```shell
> npx hardhat run .\scripts\deployFundMe.js --network sepolia
Compiled 1 Solidity file successfully (evm target: paris).
Funding contract...
FundMe deployed to 0x0519504957486cbc6562B9255E15E287ABA2036f
```

在`sepolia.etherscan.io`上查看部署后的合约：
访问，拼接上部署后的合约地址：https://sepolia.etherscan.io/address/{contract_address}


## 4. 加密配置文件

引入依赖，读取和加密env配置文件：
```shell
> pnpm add dotenv @chainlink/env-enc
```

执行私钥加密：
1. 先设置密钥（用于加解密）
2. 再执行加密：多次输入KEY，再输入VALUE，不输入任何数据，按回车则结束：
3. 结束后，根目录生成`.env.enc`文件，存储加密后的数据
```shell {1,4,14}
> npx env-enc set-pw
Enter the password (input will be hidden): ********

> npx env-enc set
Please enter the variable name (or press ENTER to finish):
SEPOLIA_URL
Please enter the variable value (input will be hidden):
*********************************************************************
Would you like to set another variable? Please enter the variable name (or press ENTER to finish):
SEPOLIA_PRIVATE_KEY
Please enter the variable value (input will be hidden):
****************************************************************
Would you like to set another variable? Please enter the variable name (or press ENTER to finish):
ENTER
```

`.env.enc`文件：
```env
SEPOLIA_URL: ENCRYPTED|luZo/4XeuQRy/rQsBJrEEabzeJCJOxkFzUaGRbPP7lzcp8ey8SmEVdE0jMXanawXOgNY/zwVjvyBxDNx2EEFEiDeFYmyc8b0CdqgIabwzdVN8QQPdB8sjUoA/+H8FopEqyS/MApS0hLjzHS/+wQ/DRarZSIs

SEPOLIA_PRIVATE_KEY: ENCRYPTED|ELthqiPHprmYJI4ovFiAuBaWuNVcQzdJikaN5GfDGxq+q52a54xHdUj/EnMsILoWzNHa4WDBo8J2BxpcIN9go7i65PRKytkFxaybGvsvjdYjXvIYIB3joaMa8MnI0ufya8b61hXz34F/Ig0QC1yGpw==
```

修改`hardhat.config.js`：
> 后续使用通过`pw`设置的密文时，需要再次设置相同的`pw`才可解密对应的密文
```js
require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    },
  },
};
```