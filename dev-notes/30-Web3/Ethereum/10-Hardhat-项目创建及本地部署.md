---
title: Hardhat-项目创建及本地部署
category: web3
tags: [solidity, hardhat]
publishedAt: 2024-01-24
description: 创建Hardhat项目，并完成合约的本地部署
---

# 1. 本地开发环境

1. Nodejs
2. Visual Studio Code
	1. Solidity (Nomic Foundation)
	2. JavaScript ES6
3. Git

# 2. 创建项目

```shell
> mkdir 01-hardhat-basic
> pnpm init
> pnpm add hardhat -D
> npx hardhat

888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.22.17

√ What do you want to do? · Create a JavaScript project
√ Hardhat project root: · F:\repository\web3-code-snippet\01-hardhat-basic
√ Do you want to add a .gitignore? (Y/n) · y
√ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y
√ Do you want to install this sample project's dependencies with pnpm? (Y/n) · y
```

package.json
```json
{
  "name": "01-hardhat-basic",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "hardhat": "^2.22.17"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-chai-matchers": "^2.0.0",
    "@nomicfoundation/hardhat-ethers": "^3.0.0",
    "@nomicfoundation/hardhat-ignition": "^0.15.0",
    "@nomicfoundation/hardhat-ignition-ethers": "^0.15.0",
    "@nomicfoundation/hardhat-network-helpers": "^1.0.0",
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "@nomicfoundation/hardhat-verify": "^2.0.0",
    "@typechain/ethers-v6": "^0.5.0",
    "@typechain/hardhat": "^9.0.0",
    "chai": "^4.2.0",
    "ethers": "^6.4.0",
    "hardhat-gas-reporter": "^1.0.8",
    "solidity-coverage": "^0.8.0",
    "typechain": "^8.3.0"
  }
}
```

目录结构
```shell
01-hardhat-basic
	|--contracts/
	|		|-- Lock.sol
	|--ignition/modules/
	|				|--Lock.js
	|--test/
	|	 |-- Lock.js
	|--.gitignore
	|--hardhat.config.js
	|--package.json
	|--README.md
```

# 3. 创建并编译智能合约

创建：`contracts/FundMe.sol`
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    mapping(address => uint256) public funderToAmountMapping;

    uint256 constant MINIMUM_WEI = 1 * 10 ** 18; // 1 Wei

    uint256 constant MINIMUM_USD = 10 * 10 ** 18; // 10 USD

    uint256 constant TARGET = 100 * 10 ** 18; // 100 USD

    AggregatorV3Interface internal dataFeed;

	// 合约的owner，在构造函数中执行一次，设定为部署合约的账户，声明为public可以直接查看此变量
    address public owner; 

    // 合约部署时间
    uint256 public startTimestamp;

    // 精度为妙，如 10 min = 60 * 10
    uint256 public lockTime;

    bool public getFundSuccess = false;

    /**
     * Network: Sepolia Testnet
     * Aggregator: ETH/USD
     * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    constructor(uint256 _lockTime) {
        owner = msg.sender;
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        startTimestamp = block.timestamp; // 当前所部署时的区块的时间戳
        lockTime = _lockTime;
    }

    function fund() external payable {
        require(convertEthToUSD(msg.value) >= MINIMUM_USD, "Send more USD");
        // 校验是否超出锁定期，此时的block是当前执行此函数时所在的区块（非部署时的block）
        require(
            block.timestamp < startTimestamp + lockTime,
            "lock winodw is closed"
        );
        funderToAmountMapping[msg.sender] = msg.value;
    }

    // 投资人退款，使用modifier
    function refund() external lockWindowCheck {
        // 查看当前的合约的账户的资产，没有达到目标值
        require(
            convertEthToUSD(address(this).balance) < TARGET,
            "Target overflow"
        );
        // 查看当前退款的账户的余额是不是存在
        uint256 fundBalance = funderToAmountMapping[msg.sender];
        require(fundBalance >= 0, "no fund");
        // 防止重入
        funderToAmountMapping[msg.sender] = 0;
        // 执行退款
        (bool success, ) = payable(msg.sender).call{value: fundBalance}("");
        require(success, "transfer failed");
    }

    function getFund() external lockWindowCheck {
        // 仅允许owner提款
        require(
            msg.sender == owner,
            "This function can only be called by owner!"
        );
        // balance 单位为：Wei
        require(
            convertEthToUSD(address(this).balance) >= TARGET,
            "Target is not reached!"
        );

        // 转账 transfer：将address的余额，转账给msg.sender
        payable(msg.sender).transfer(address(this).balance);
        // 标记已执行完成
        getFundSuccess = true;
    }

    function transferOwnership(address newOwner) public {
        require(
            msg.sender == owner,
            "This function can only be called by owner!"
        );
        owner = newOwner;
    }

    modifier lockWindowCheck() {
        require(
            block.timestamp >= startTimestamp + lockTime,
            "lock winodw is not closed"
        );
        _;
    }

    /**
     * Eth -> USD
     */
    function convertEthToUSD(
        uint256 ethAmount
    ) internal view returns (uint256) {
        uint256 price = uint(getChainlinkDataFeedLatestAnswer());
        // 精度，具体看预言机函数的介绍
        return (ethAmount * price) / (10 ** 8);
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
```

引入外部合约：
```shell
>  pnpm install @chainlink/contracts -D
```

编译合约，编译完成后会生成新的文件：
```shell
> npx hardhat compile

# 新增目录：artifacts 和 cache
artifacts/
	|-- @chainlink
	|-- build-info
	|-- contracts
	|		|-- FundMe.sol/
	|				|-- Fundme.dbg.json
	|				|-- FundMe.json
cache/
	|-- solidity-files-cache.json
```


# 4. 本地部署合约

使用`hardhat`默认部署到本地网络，非测试网络；（类似于Remix VM）

了解更多hardhat网络：[hardhat-network](https://hardhat.org/hardhat-network/docs/overview)
- in-process network / stand-alone daemon(独立测试网络)

在`scripts/`下创建部署脚本：`deployFundMe.js`：
```js {7,11,15}
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
}

// 执行
main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
})
```

执行编译部署：
```shell {2}
> npx hardhat run ./scripts/deployFundMe.js
Compiled 3 Solidity files successfully (evm target: paris).
Funding contract...
FundMe deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```


