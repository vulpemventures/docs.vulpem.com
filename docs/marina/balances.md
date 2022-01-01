---
id: balances
title: Display Balances
image: /img/marina_logo.svg
---

Once the user accepted the request to [connect](connect.md) with your application, you can access his addresses and relative blinding keys. This can compromise user privacy, be very mindful how you handle this secret material, altough you cannot spend or put user's funds at risks.

In order to have the app to build an unsigned transaction on behalf of the user, one must be able to access the user's addresses and blinders necessary to reveal user's asset and amounts held by those addresses.


## New address

Derive a new confidential address and his blinding key for receiving funds
```js
await window.marina.getNextAddress();
/*
{
  confidentialAddress: string;
  blindingPrivateKey: string;
  derivationPath?: string;
}
*/
```

## New change address

Derive a new confidential address and his blinding key to be used as **change** output
```js
await window.marina.getNextChangeAddress();
/*
{
  confidentialAddress: string;
  blindingPrivateKey: string;
  derivationPath?: string;
}
*/
```

## All addresses

Retrieve all derived confidential addresses with blinding keys till now
```js
await window.marina.getAddresses();
```


## Fetch and unblind utxos


Example using `fetchAndUnblindUtxos` from `ldk` package. In production prefer generator syntax exposed via `fetchAndUnblindUtxosGenerator` method instead.

```jsx
import { fetchAndUnblindUtxos } from 'ldk';

//...

// Get all addresses and blinding keys from marina
const addrs = await window.marina.getAddresses();

// fetch and unblind all utxos for given array of address
//
// THIS CAN TAKE A LOT OF TIME TO COMPLETE!
// use fetchAndUnblindUtxosGenerator instead
const utxos = await fetchAndUnblindUtxos(addrs, ESPLORA_API_URL);

// It will return an array of unblinded utxos
// we suggest to cache unblindData in order to speed-up
// future transaction building and blinding.
console.log(utxos);
/*
[
  {
    txid: string;
    vout: number;
    asset?: string;
    value?: number;
    prevout?: TxOutput;
    unblindData?: confidential.UnblindOutputResult;
  }
]
*/
```


