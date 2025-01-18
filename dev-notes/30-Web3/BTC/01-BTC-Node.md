---
title: BTC Node
category: web3
tags: [btc]
publishedAt: 2023-11-01
description: what is BTC node and how does it works
---

# Node
A node is a server running the Bitcoin program that sends, receives, or processs data connected to a network.

It connects to other nodes on the network to share information about transactions and blocks.

## Job

1. Keep a copy of the blockchain.
2. Validate and reply new transactions and blocks.

## Full Node

A full node is a node that can keep up with the blockchain and validate the blocks and transactions it receives. It receives a complete copy of blockchain.
- Archival Node: keeps a full copy of the blockchain. It can replicate the entire blockchain to any new node joining the network.
- Pruned Node: does not keep a full copy of the blockchain, instead, it receive a complete copy of blockchain but it deletes older blocks further down the chain as it goes to save on disk space.

> 存档节点保留区块链的完整副本。 它可以将整个区块链复制到加入网络的任何新节点。
> 修剪后的节点会收到区块链的完整副本，但它会删除链上较旧的区块，以节省磁盘空间。
## Lightweight Node

A lightweight node is a node that can keep up with the blockchain, but it cannot validate the blocks and transactions it receives.

Instead, it can verify that a block or transaction exists in the bloclchain, but it cannot comfirm that they are valid.

A common type of lightweight node is SPV wallet which only receives the block headers of the blockchain.

It can request proof from a full node to comfirm whether a specific transaction is in a specific block

# Requirements

1. **Disk Space**: to store the blockchain. The blockchain also grows at a rate of around 100 GB/year.
2. **RAM**: to store the latest trasactions in the mempool, as well as for storing UTXOs to help speed up the validation of new transactions and blocks.
3. **Bandwidth**: a node is constantly sending and receiving transactions and blocks to and from other nodes on the network, so you will need enough bandwidth to cover this.
memory pool: a waiting area for new transactions.