---
id: introduction
title: Introduction
image: /img/marina_logo.svg
---

Welcome to Marina's Developer Documentation. This documentation is for learning how to develop web applications for the Liquid Network.

- You can find the latest version of Marina on our [website](https://vulpem.com/marina).
- For help using Marina, [join our Telegram channel](https://t.me/marina_wallet).
- To report bugs or make feature request [open an issue on the Github repository](https://github.com/vulpemventures/marina/issues/new).
- To stay in touch [follow us on Twitter](https://twitter.com/MarinaWallet)


## Blockchain

Marina connects to a remote Electrs instance and this allows you to get started without synchronizing a full node, while still providing the option to upgrade your security and use the Electrs server of your choice. The supported explorers are `Blockstream.info` and `Mempool.space`.

In the future we will allow authenticated JSONRPC HTTP/1.x connection to your own Elements node.

## Wallet 

Marina uses an embedded HD wallet and encrypts it with AES-256 the mnemonic seed with a password of choice and we always ask the user to unlock (ie. decrypt) with the password everytime we need to access the private keys to sign a transaction or to show the mnemonic.

All the addresses are by default confidential native segwit (ie. BLECH32 format) and defaults to native segwit derivation defined in BIP84 `m/84’/0’/0’/0/0`. 

:::caution
It does not switch the Coin type, defaulting to 0 for both Liquid and RegTest. Therefore is strongly suggested to have a dedicated seed for each network.
::::

