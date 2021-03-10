---
id: transaction
title: Send Transaction
image: /img/marina_logo.svg
---

You can delegate Marina to build, blind, sign and send a Liquid transaction to a single recipient. You do not need to know anything about current balance, although is suggetsed to retrieve and display the [balances](balances.md) on your application to check beforehand for sufficient funds.


## Send to an address

```js
// confidential address
const recipient = "el1qq2c6wq4qr32vgnd5zz9kc3a9n5ancmwak66zt35vvxa7hyemqw773mtlp8z0mmwm6y5tfcq53qv5y9rfq83kqfwwquxvepy6g"

// this is the L-BTC from Nigiri RegTest, which runs liquidregtest in elements.conf
const BtcLiquidRegtest = "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225"

// amount in satoshis
const amount = 700000


const txHash = await window.marina.sendTransaction(
  recipient,
  amount,
  BtcLiquidRegtest,
);

console.log(txHash);
```

This will prompt the user to allow blinding & signing a transaction.
<img src="/img/marina_spend.png" alt="Marina Spend" width="300"/>

If the prompt is accepted, will be possible to send the transaction






