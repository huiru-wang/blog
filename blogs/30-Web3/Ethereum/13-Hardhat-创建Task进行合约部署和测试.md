---
title: Hardhat-创建Task进行合约部署和测试
category: web3
tags:
  - solidity
  - hardhat
publishedAt: 2024-01-27
description: 使用Hardhat测试合约，并创建自定义Task
---

# 合约测试

TODO

# 自定义Hardhat Task

## 创建Task

创建目录及文件：`/tasks/deploy-fundme.js`：自定义部署task

```js {26, 28-30}
// /tasks/deploy-fundme.js
const { task } = require("hardhat/config");

// task名称，task描述
task("deploy-fundme", "Deploy FundMe.sol").setAction(async (taskArgs, hre) => {
    // 创建合约工厂，参数为合约文件名
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("fundMeFactory created");

    // 传入构造函数参数
    const fundMe = await fundMeFactory.deploy(180);
    console.log(`Contract deploying`);

    // 同步等待部署完成
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
                180
            ]
        });
    } else {
        console.log(`Skipping verification`);
    }
});

module.exports = {};
```

`/tasks/index.js`：导出当前文件夹下的函数
```js
// /tasks/index.js
exports.deployFundMe = require('./deploy-fundme');
```

## 配置并执行Task
在配置文件中引入task：
```js {4}
require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();
// 引入自定义task
require("./tasks/deploy-fundme");

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    }
  },
};
```

命令行查看task，可以看到自定义的task：`deploy-fundme`
```shell {12}
> npx hardhat help
Hardhat version 2.22.17
Usage: hardhat [GLOBAL OPTIONS] [SCOPE] <TASK> [TASK OPTIONS]
...

AVAILABLE TASKS:
  check                 Check whatever you need
  clean                 Clears the cache and deletes all artifacts
  compile               Compiles the entire project, building all artifacts
  console               Opens a hardhat console
  coverage              Generates a code coverage report for tests
  deploy-fundme         Deploy FundMe.sol
```
