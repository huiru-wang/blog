---
title: Ethereum和Solidity相关QA
category: web3
tags:
  - ethereum
  - solidity
publishedAt: 2024-06-01
description: Ethereum和Solidity相关问题及答案
---

https://www.geeksforgeeks.org/solidity-interview-questions/?ref=gcse_outind
# What is Solidity

Solidity is a statically-typed object-oriented programming language which is a primary language for blockchain platforms. It is designed for implementing smart contracts. It can be used for implementing contracts for functionalities like Voting, Crowdfunding, Multi-signature wallets, etc. 


# What is Gas

when you want to transfer some tokens or perform a complex calculation within a smart contract, a certain amount of gas will be deducted from your account as payment.

The more complex the operation, the more gas it will consume.


# What is Gas Limit

A gas limit in Solidity refers to the maximum amount of gas a user is willing to spend on a transaction.
When creating a transaction on the Ethereum Network user must specify the gas limit to ensure that they don’t spend more gas than they intend.
Rules:
- If a transaction requires more gas than the specified gas limit, the transaction will be reverted, and the used gas will not be refunded.
- If a transaction requires less than the gas limit, the remaining gas will be returned to the user.

