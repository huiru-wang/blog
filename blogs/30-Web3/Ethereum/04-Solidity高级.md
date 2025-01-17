---
title: Solidity高级
category: web3
tags:
  - solidity
publishedAt: 2024-01-03
description: Solidity继承和抽象，转账函数
---

# 继承


# 抽象合约


```js
abstract contract Parent {
    uint256 public value;
    
    // 不可被继承
    uint256 private notInheritValue;

    function addOne() public {
        value++;
    }
	
	// 强制子合约实现此函数
	function addTwo() public virtual;
	
	// 不强制子合约实现此函数，提供了默认实现
	function addThree() public virtual {
		value += 3;
	}
}

contract Child is Parent{

	// 实现virtual function，显示声明override
    function addTwo() public override {
        value+=2;
    }

	// 重写父合约的默认实现
	function addThree() public override {
		value += 3;
	}
}
```


# Transfer

Solidity中有3种转账函数：

## Transfer
`transfer`函数是`address`类型的成员函数，以`wei`为单位进行转账；
- 转账失败自动回滚交易，仅损失gas，不会损失转账的金额；

```js
contract MyContract { 
	// 收款人地址
	address payable public recipient; 
	
	constructor(address payable _recipient) { 
		recipient = _recipient; 
	} 
	// 执行转账
	function sendEther() public payable { 
		// 检查发送的以太币数量是否大于0 
		require(msg.value > 0, "You need to send some Ether"); 
		// 将合约收到的所有以太币转账给recipient 
		recipient.transfer(msg.value); 
	} 
}
```
## Send

`send`函数是`address`类型的成员函数，以`wei`为单位进行转账；
- 转账失败不会自动回滚交易，函数返回false；
- 需要手动`revert`来回滚交易；
```js
contract MyContract { 
	// 收款人地址
	address payable public recipient; 
	
	constructor(address payable _recipient) { 
		recipient = _recipient; 
	} 
	// 执行转账
	function sendEther() public payable { 
		// 检查发送的以太币数量是否大于0 
		require(msg.value > 0, "You need to send some Ether"); 
		// 将合约收到的所有以太币转账给recipient 
		bool result = recipient.send(msg.value);
		if (!result) {
			revert("Transfer Failed")
		}
	} 
}
```

## Call

`transfer`、`send`都仅可执行Eth的转账操作；

`call`函数不仅可转账，还可以调用其他合约的函数，更灵活，更强大；
- 可以携带更多的参数，转账时则是指定转账金额的参数；
- 转账失败有几种情况：
	- gas不足：call函数可以设置gas limit，如果gas不足则会失败；
	- 接收方合约异常：对方的`fallback`、`receive`函数执行失败；

```js
contract MyContract { 
	// 收款人地址
	address payable public recipient; 
	
	constructor(address payable _recipient) { 
		recipient = _recipient; 
	} 
	
	// 执行转账
	function sendEther() public payable { 
		// 检查发送的以太币数量是否大于0 
		require(msg.value > 0, "You need to send some Ether"); 
		// 调用recipient地址对应的合约，并带有value个eth执行转账，无参数则传空
		uint256 gasLimit = 3000;
		(bool result,) = recipient.call{value: msg.value, gas: gasLimit}("");
		if (!result) {
			revert("Transfer Failed")
		}
	} 
}
```


# 转账失败

1. Gas的消耗取决于转账操作执行到的阶段；成功与否gas都会损失；
2. 如果转账未开始，或执行的操作较少时失败，仅消耗少量gas，剩余gas退还；
3. 如果转账已经执行到`fallback`、`receive`函数，gas消耗视执行情况而定；
4. `call`函数内如果设置了`gas limit`，因为gas不足而转账失败，则交易失败，gas不退还；

