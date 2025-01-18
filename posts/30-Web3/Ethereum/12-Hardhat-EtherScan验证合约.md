---
title: Hardhat-EtherScan验证合约
category: web3
tags: [solidity, hardhat]
publishedAt: 2024-01-26
description: 使用Hardhat的命令行和脚本在etherScan中验证合约
---

# 在etherScan中验证合约

## 配置apiKey

配置`etherscan`的apiKey：[https://etherscan.io/myapikey](https://etherscan.io/myapikey)

>可以同样进行加密；（省略）

```js
require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,    // sepoliaId
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "**************************",
    }
  },
};
```

## 命令行验证合约

- 指定Network
- 指定合约地址
- 指定合约构造参数

```shell
> npx hardhat verify --network sepolia 0x30dC5995B8dF789db81BE9aaC312463f1998019d 180

Successfully submitted source code for contract
contracts/FundMe.sol:FundMe at 0x30dC5995B8dF789db81BE9aaC312463f1998019d
for verification on the block explorer. Waiting for verification result...

Successfully verified contract FundMe on the block explorer.
https://sepolia.etherscan.io/address/0x30dC5995B8dF789db81BE9aaC312463f1998019d#code
```

访问sepolia.etherscan，查看对应的合约：
![](/dev/images/web3-solidity-etherscan-verify.png)

## 脚本自动化验证合约
- 添加验证的代码
- 执行部署脚本，部署完成直接验证
```js
const { ethers } = require("hardhat");

// 部署函数
async function main() {

    // 创建合约工厂，参数为合约文件名
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("fundMeFactory created");

    // 传入构造函数参数
    const fundMe = await fundMeFactory.deploy(180);
    console.log(`Contract deploying`);

    // 同步执行部署
    await fundMe.waitForDeployment();
    console.log(`FundMe deployed to ${fundMe.target}`);
    
    // 如果部署的网络是sepolia测试网络，则验证合约
    if (hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        // 等待5个区块的确认，确保合约部署成功
        console.log(`Verify contract ${fundMe.target}, waiting for 5 blocks confirmations...`);
        await fundMe.deploymentTransaction().wait(5);
        console.log(`Verifying contract...`);
        await hre.run("verify:verify", {
            // 合约地址
            address: fundMe.target,
            // 合约构造参数
            constructorArguments: [
                10
            ]
        });
    }
}

// 执行
main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
})
```

执行脚本：
```shell
npx hardhat run .\scripts\deployFundMe.js --network sepolia
```

