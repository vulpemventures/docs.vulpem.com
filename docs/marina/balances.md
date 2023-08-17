---
id: balances
title: Display Balances
image: /img/marina_logo.svg
---

Once the user accepted the request to [connect](connect.md) with your application, you can access his addresses and relative blinding keys. This can compromise user privacy, be very mindful how you handle this secret material, altough you cannot spend or put user's funds at risks.

In order to have the app to build an unsigned transaction on behalf of the user, one must be able to access the user's addresses and blinders necessary to reveal user's asset and amounts held by those addresses.


## New address

Derive a new confidential address and his blinding key for receiving funds.
```js
await window.marina.getNextAddress();
/*
{
  publicKey: string;
  script: string;
  derivationPath?: string;
  unconfidentialAddress?: string;
  confidentialAddress?: string;
  blindingPrivateKey?: string;
}
*/
```

## New change address

Derive a new confidential address and his blinding key to be used as **change** output
```js
await window.marina.getNextChangeAddress();
```

## All addresses

Retrieve all derived confidential addresses with blinding keys till now
```js
await window.marina.getAddresses();
```

## Balances

Retrieve all balances for all accounts held by the user
```js
await window.marina.getBalances();
/*
[{
  asset: Asset, 
  amount: number // expressed in satoshis
}]
*/
```

`Asset` objects contains data fetched from the liquid asset registry.
```ts
export interface Asset {
  assetHash: string;
  name: string;
  precision: number;
  ticker: string;
};
```

## Unblinded Utxos

Marina is unblinding UTXOs for you. Retrieve all the unblinded UTXOs:
```js
await window.marina.getCoins();
```

Returns a list of [Utxo](https://github.com/vulpemventures/marina-provider/blob/master/src/types.ts#L67). It contains unblinded asset/value pair, the blinding factors and data about the locking script. All the utxos returned by this method will be signed if passed via a pset to `marina.signTransaction` method.

> ⚠️ **Warning**: UTXOs could be unconfidential, in this case blinding factors will be a 32 bytes buffer filled with 0s.


## All transactions

Marina is fetching all the transaction related to your addresses, confirmed and unconfirmed.

```js
await window.marina.getTransactions();
/*
[{
  txId: string;
  hex?: string; // marina is async, it's possible that hex is not fetched yet
  height: number; // 0 means unconfirmed
  explorerURL: string; // link to explorer page with revealed confidential data
}]
*/
```


