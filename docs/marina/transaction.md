---
id: transaction
title: Transaction
image: /img/marina_logo.svg
---

## Send to an address

You can delegate Marina to create, fund, blind, sign and broadcast a Liquid transaction to a recipient. You do not need to know anything about current balance, although is suggested to retrieve and display the [balances](balances.md) in your application for better UX and to check beforehand for sufficient funds.


```js
// Send 0.007 LBTC to an address
const { txid, hex } = await window.marina.sendTransaction(
  [
    {
      address: "el1qq2c6wq4qr32vgnd5zz9kc3a9n5ancmwak66zt35vvxa7hyemqw773mtlp8z0mmwm6y5tfcq53qv5y9rfq83kqfwwquxvepy6g", // the address of the recipient
      asset: "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225", // the asset to send
      value: 700000 // amount always expressed in satoshis
    }
  ],
);

console.log(txid, hex);
```

This will prompt the user to allow blinding & signing a transaction.
<img src="/img/marina_spend.png" alt="Marina Spend" width="300"/>

If the prompt is accepted, the transaction will be blinded, signed and broadcasted.



## Custom transaction

Developers can build custom transactions using the unspents of the exposed addresses and can delegate Marina to sign with the user consent.

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
  Psbt.ECCKeysGenerator(ecc),
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


