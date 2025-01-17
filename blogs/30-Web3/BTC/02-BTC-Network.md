---
title: BTC Network
category: web3
tags: [btc]
publishedAt: 2023-11-02
description: what does A BTC Network look like? What is Mercle Root and how does it work?
---

# Communication

A node communitates other nodes by sending lots of individual messages. These messages are sent via TCP.
## Network Protocol
1. TCP: a common way for two computers on a network to communicate with each other.
2. Bitcoin protocol: a set of rules on the structure and order of messages sent between nodes.
## Magic Bytes

Magic bytes are used as a way to **identify the separate messages** sent between nodes on the Bitcoin network.

Mainnet Network Magic Bytes: `f9beb4d9`
Testnet3 Network Magic Bytes: `0b110907`
Regtest Network Magic Bytes: `fabfb5da`

> 主网、测试网、注册测试使用不同的魔术字节在消息的开头；

This is a raw Tx message on the Mainnet network

```
f9beb4d9747800000000000000000000e00000006a86deb701000000015ac5ae0a2ba96622c9b79de2c339084c8b1d30f63bb55a315f354db4d9a6abcf010000006b4830450221009ad52459e1e8bd5e758399cc0be963c75726c5089499465d9aa79ffb304ecd3802207d73ea58047f4d1f857b400cbff725ef562b7ada1c26e763c5a1aa6d29d2fdf401210234b7b614fcc0e4d926747d491992d8cc133f076bd79095eddf60c34b0e3fef4affffffff02390205000000000017a914ea3b6d7e92e05370bc8a61d3f05dbfdc90bb1d9587d1df3000000000001976a91425f0800454530549ed93747a6449aefe2618203988ac00000000
```

why do we use magic bytes:

there's nothing actually _magical_ about magic bytes, they're just used to help with delimiting a stream of data.

>魔术字节仅仅是为了界定消息边界