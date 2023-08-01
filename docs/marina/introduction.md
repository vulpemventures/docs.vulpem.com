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

The wallet is organized by accounts. Each account is a different path of the wallet's HD tree and is assigned with a unique name. By default, Marina creates _3 "main" accounts_:
 * "mainAccount" (m/84'/1776'/0') enabled on Liquid mainnet only.
 * "mainAccountTest" (m/84'/1'/0') enabled on Liquid testnet and regtest networks.
 * "mainAccountLegacy" (m/84'/0'/0') enabled on all networks.
All the main accounts are confidential P2WPKH (native segwit).

:::tip
The "mainAccountLegacy" is not used by Marina extension to receive coins. It is only used to restore and spend the balance of legacy accounts created with the old version of Marina. 
:::

Marina let's you create additional custom accounts and uses [SLIP13](https://github.com/satoshilabs/slips/blob/master/slip-0013.md) to generate the derivation path directly from an account name.

