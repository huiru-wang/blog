---
title: BTC Transactions
category: web3
tags: [btc]
publishedAt: 2023-11-06
description: what is BTC Transactions 
---

# Transaction

BTC的交易包含：
1. 交易版本号；
2. 输入信息：（1或多个）
	1. 交易的金额（交易的输入数量）
	2. 交易输入：指定前序交易的输出，作为当前交易的输入；
3. 输入信息：（1或多个）
	1. 交易输出的金额
	2. 交易输出：接收方的公钥；
4. 交易锁定时间：指定交易的区块高度，到达区块高度之前，交易不能被纳入区块；
5. 交易签名：对交易内容的数字签名；（ECDSA签名算法）

# UTXOs
UTXO: Unspend Transaction Outputs

Every bitcoin transaction creates outputs that can be consumed as inputs in future transactions.

UTXOs are simply the transaction outputs that have not been consumed yet and can still be used for spending.

## 1. UTXO construction process

全节点在启动时，会开始便利所有的区块的所有交易，检查交易的输出，如果一个交易没有被后续交易作为输入，那么就被认为是一个UTXO；

全节点收集所有的UTXO，构建一个初始的UTXO集合，存储在内存中 (RAM)，为验证交易提供高效的查询和更新；

监听后续的区块、交易，不断的更新UTXO集合；并将UTXO集合用于验证新的交易；

## 2. Validating transactions

When your node receives a new transaction from the network, it needs to validate that all of its inputs are referencing outputs that have **not already been spent**.

If the transaction's inputs are all unspent outputs (UTXOs), then the transaction is valid.

However, if the transaction is trying to spend an output that has already been spent in a previous transaction, then the transaction is invalid and will be rejected

当全节点收到新的交易，对其进行验证时：
- 验证签名；
- 验证输入、输出、交易费；
- 验证交易脚本；

此过程需要用到UTXO集合以及本地交易池，来确保交易没有DoubleSpending

# 发起一笔交易到确认的流程

![](/dev/images/web3-fundation-consensus.png)

## 1. 构建交易

1. 交易版本号；
2. 输入信息：（UTXO：1或多个）
	1. 交易的金额（交易的输入数量）
	2. 交易输入：指定前序交易的输出，作为当前交易的输入；
3. 输入信息：（1或多个）
	1. 交易输出的金额
	2. 交易输出：接收方的公钥；
4. 交易锁定时间：指定交易的区块高度，到达区块高度之前，交易不能被纳入区块；
5. 交易签名：对交易内容的数字签名；（ECDSA签名算法）

## 2. 广播交易

发送交易到BTC网络；通过BTC网络不断地向附近的节点传播；

## 3. 验证交易

矿工收到交易，开始验证：
- 验证签名的正确性；
- 验证输入、输出金额、手续费；
- 验证UTXO：在本地的UTXO集、交易内存池中查找确认UTXO是否已经被花费；
- 验证交易脚本；需要符合特定的规则；

## 4. 等待区块确认

BTC通常以6个区块作为交易确认；

