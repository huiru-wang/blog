---
title: Solidity基础
category: web3
tags:
  - solidity
publishedAt: 2024-01-01
description: Solidity学习基础语法部分
---

# 1. Data Type

## 1.1 值类型（Value Type）

- bool
- 无符号整数：uint8、uint16、uint32、uint64、uint128、uint256、uint;
- 有符号整数：int8、int16、int32、int64、int128、int256、int;
- 固定长度字节数组：bytes1表示长度为1的字节数组，如`bytes1`、`bytes2`等；
- 枚举
- 地址类型：address；存储一个`20字节`(`160位`)的值

## 1.2 引用类型（Reference Type）

- string：动态字节数组
- 定长数组：`uint[3] fixedArray;`
- 动态数组：`uint[] dynamicArray;`
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract HelloWorld {
	// 声明结构体
    struct Info {
        uint256 id;
        string message;
        address addr;
    }
	// 声明结构体数组
    Info[] infos;

    function pushInfo(uint256 _id, string memory _message) public {
        Info memory info = Info(_id, _message, msg.sender);
        infos.push(info);
    }

    function getInfoById(uint256 _id) public view returns (Info memory) {
        for (uint256 i = 0; i < infos.length; i++) {
            if (infos[i].id == _id) {
                return infos[i];
            }
        }
        return Info(_id, "", msg.sender);
    }
}
```

- 结构体
```js
struct Info {
	uint256 id;
	string message;
	address addr;
}
```

## 1.3 映射类型（Mapping Type）
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract HelloWorld {
	// 声明结构体
    struct Info {
        uint256 id;
        string message;
        address addr;
    }
	// 声明结构体map
    mapping(uint256 => Info) public infoMapping;

    function pushInfo(uint256 _id, string memory _message) public {
        Info memory info = Info(_id, _message, msg.sender);
        infoMapping[_id] = info;
    }

    function getInfoById(uint256 _id) public view returns (Info memory) {
        Info memory info = infoMapping[_id];
        // 是否存在
        if (info.addr == address(0x0)) {
            return Info(_id, "", msg.sender);
        }
        return info;
    }
}
```


## 1.4 时间变量
Solidity中使用的时间是Unix Timestamp，最小时间单位是秒；`seconds`、`minutes`、`hours`、`days`、`weeks`都是时间单位，可以进行运算，如：`1 minutes + 1 seconds`
- seconds：`1`
- minutes：`60 seconds = 1 minute`
- hours：`60 minutes = 3600 seconds`
- days：`24 hours = 86400 seconds`
- weeks：`7 days = 604800 seconds`
```js
function minutesUnit() external pure returns(uint) {
    assert(1 minutes == 60);
    assert(1 minutes == 60 seconds);
    return 1 minutes + 1 seconds;
}
```


## 1.5 常量constant

constant：常量，在任何地方都不可被修改；
```js
uint256 constant TARGET = 1000;
```


## 1.6 变量作用域和Gas消耗

- 状态变量(state variable)：存储在链上的变量，所有合约内函数都可以访问，在合约内、函数外声明；（消耗Gas高）
- 局部变量(local variable)：仅在函数执行过程中有效的变量，不上链（Gas低）
- 全局变量(global variable)：Solidity内置的全局变量，不需要定义；

## 1.7 变量的存储

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract HelloWorld {

    string message = "hello world";

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string calldata text) public {
	    // calldata：保证text不可被修改
        message = text;
    }
    
    function setMoreMessage(string memory text) public {
	    // memory：允许text被修改
        text = string.concat(text, " From External");
        message = text;
    }
}
```

- storage：存储在合约的持久化存储中，可以跨函数调用，可以修改；（消耗gas最多）
- memory：存储在内存中，不上链中，可修改；返回数据类型是变长的情况下，必须添加`memory`，如`string`、`bytes`、`array`等；
- calldata：存储在内存中，不上链，不能修改；(immutable)


## 1.8 环境变量Enviroment Variable
msg

block

# 2. 函数

```js
function <function name>(<parameter types>) {internal|external|public|private} [pure|view|payable] [returns (<return types>)]
```
- public：次函数在合约内部和合约外部都可见；
- private：只能从合约内部访问，继承的合约也不能使用。
- external：只能从`合约外部`访问（内部可以通过`this.f()`来调用）。
- internal: 只能从`合约内部`访问，继承的合约可以用。
- payable：此函数被允许在运行的时候可以向合约转入ETH
- pure：纯函数，不能读取合约状态、也不能写合约状态；
- view：仅读合约状态，不能写合约状态；

| Visibility | Within Contract | Outside Contracts | Child Contracts | External Contracts |
| ---------- | --------------- | ----------------- | --------------- | ------------------ |
| public     | Yes             | Yes               | Yes             | Yes                |
| private    | Yes             | No                | No              | No                 |
| internal   | Yes             | No                | Yes             | No                 |
| external   | No              | Yes               | No              | Yes                |

当需要从合约外部（包括其他合约和用户账户）访问函数，并且可能在继承合约中也被访问时，使用public关键字；
```sol
contract Token {
    mapping(address => uint) public balances;
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    function getBalance(address _address) public view returns (uint) {
        return balances[_address];
    }
}
```

## 2.2 private
用于限制函数只能在当前合约内部访问，不能被外部合约或者用户账户调用，也不能在继承合约中被访问。当函数包含只与合约内部逻辑相关的操作，不希望外部干扰时使用。

假设我们有一个合约，内部有一个计算利息的函数，这个函数的计算逻辑不应该被外部访问
```sol
contract BankAccount {
    uint private interestRate;
    function setInterestRate(uint _rate) private {
        interestRate = _rate;
    }
    function calculateInterest() public view returns (uint) {
        // 这里假设还有其他存储变量代表账户余额等
        uint balance = 100; // 假设余额为100，实际情况可能从存储中获取
        return balance * interestRate;
    }
}
```

## 2.3 external
用于定义只能从合约外部调用的函数，在合约内部不能直接调用（除非通过this关键字）。这种函数通常用于接收外部输入并更新合约状态，或者提供外部可调用的接口

假设我们有一个投票合约，有一个外部函数用于用户投票
```sol
contract Voting {
    mapping(uint => uint) public votes;
    function vote(uint _candidateId) external {
        votes[_candidateId]++;
    }
}
```

## 2.4 internal
当函数需要在当前合约内部以及继承该合约的子合约中使用，但不允许外部合约和用户账户直接访问时，使用internal关键字

```sol
contract Asset {
    function _calculateBaseValue() internal pure returns (uint) {
        return 100; // 假设基础价值为100，实际可能是复杂计算
    }
}
contract ExtendedAsset is Asset {
    function calculateTotalValue() public pure returns (uint) {
        // 假设还有其他因素影响总价值，这里先只考虑基础价值
        return _calculateBaseValue();
    }
}
```


## 2.5 view & pure



# 3. payable

表示此函数可以接受网络的native token


# 3. 构造函数constructor

```js
constructor() {
	dataFeed = AggregatorV3Interface(
		0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
	);
}
```

# 4. 其他关键字

## 4.1 payable


## 4.2 modifier

`modifier`（修饰符）是一种特殊的函数属性，用于在函数执行前后添加额外的逻辑或条件检查。

```js
// 定义modifier，判断是否为当前owner
modifier isOwner() {
	require(msg.sender == owner, "This function can only be called by owner!");
	_;
}

// 提款函数
function withdrew() external isOwner {
	// 转账 transfer：将address的余额，转账给msg.sender
	payable(msg.sender).transfer(address(this).balance);
}
```

