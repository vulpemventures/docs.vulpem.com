---
id: transaction
title: Transaction
image: /img/marina_logo.svg
---

## Send to an address

You can delegate Marina to build, blind, sign and send a Liquid transaction to a single recipient. You do not need to know anything about current balance, although is suggetsed to retrieve and display the [balances](balances.md) in your application for better UX and to check beforehand for sufficient funds.


```js
// confidential address
const recipient = "el1qq2c6wq4qr32vgnd5zz9kc3a9n5ancmwak66zt35vvxa7hyemqw773mtlp8z0mmwm6y5tfcq53qv5y9rfq83kqfwwquxvepy6g"

// this is the L-BTC from Nigiri RegTest, which runs liquidregtest in elements.conf
const BtcLiquidRegtest = "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225"

// amount in satoshis
const amount = 700000

// Send 0.007 LBTC to an address
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



## Custom transaction

Developers can build custom transactions using the unspents of the exposed addresses and can delegate Marina to blind and sign with the user consent.



```js
import { Psbt, networks, BlindingDataLike } from 'liquidjs-lib';

// Empty psbt elements
const psbt = new liquid.Psbt({ network: networks.regtest });

// Add inputs got from marina and outputs 
psbt.addInput({
  //...
});
psbt.addOutput({
  // ...
});


// Let's blind all the outputs. The order is important (same of output and some blinding key)
// The marina blinding private key is an hex string, we need to pass to Buffer.
await psbt.blindOutputs(
  [
    Buffer.from(blindingPrivateKeyOfMarinaInput, 'hex')
  ],
  [
    blindingPublicKeyOfMarinaChangeAddress,
    blindingPublicKeyOfRecipientAddress,
  ]
);

// encode to base64
const encodedTx = psbt.toBase64();
        
// now you can sign with Marina
const signedTx = await window.marina.signTransaction(encodedTx);
```


This will prompt the user to allow signing the custom transaction
<img src="/img/marina_spend.png" alt="Marina Spend" width="300"/>

If the prompt is accepted, will be possible to retrieve the signed base64 transaction


