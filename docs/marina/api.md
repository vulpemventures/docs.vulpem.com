---
id: api
title: API reference
image: /img/marina_logo.svg
---

:::tip
We recommend that all web developers read from the [Getting started](getting-started) section and onward .
:::

Marina injects a global API into websites visited by its users at window.marina. This API allows websites to request users' Liquid addresses and blinding keys, read data about the blockchain the user is connected to, and suggest that the user sign messages and send transactions.

The [marina-provider](https://www.npmjs.com/package/marina-provider) package provides a function `detectProvider` to inspect and fetch the `window.marina` provider.


```javascript
import { detectProvider } from 'marina-provider';

try {
  const marina = await detectProvider('marina');
  initApp(marina); // initialize your app
} catch (err) {
  console.log('Please install Marina extension!');
}
```

## Basics

For any non-trivial Liquid-powered web application to work, you will have to:

- Detect if Marina provider is installed
- If the first time for the user, ask permissions to connect
- Detect which network the user is connected to (either `liquid` or `regtest`)
- Get the user's Liquid addresses(s) and blinding keys

The snippet at the top of this page is sufficient for detecting the provider.

The provider API is all you need to create a full-featured Liquid powered web application.

## API

### MarinaProvider

- [isEnabled](#isenabled)
- [isReady](#isready)
- [enable](#enable)
- [disable](#disable)
- [getNetwork](#getnetwork)
- [getAddresses](#getaddresses)
- [getNextAddress](#getnextaddress)
- [getNextChangeAddress](#getnextchangeaddress)
- [sendTransaction](#sendtransaction)
- [blindTransaction](#blindtransaction)
- [signTransaction](#signtransaction)
- [signMessage](#signmessage)
- [getTransactions](#gettransactions)
- [getCoins](#getcoins)
- [getBalances](#getbalances)
- [getFeeAssets](#getfeeassets)
- [on](#on)
- [off](#off)

### Utils

- [detectProvider](#detectprovider)

### isEnabled

```typescript
marina.isEnabled(): Promise<boolean>
```

### isReady

```typescript
marina.isReady(): Promise<boolean>
```
> Returns true if the user has already set up a wallet.

### enable

```typescript
marina.enable(): Promise<void>
```

### disable

```typescript
marina.disable(): Promise<void>
```

### getNetwork

```typescript
marina.getNetwork(): Promise<'liquid' | 'regtest'>
```

### getAddresses

```typescript
marina.getAddresses(): Promise<AddressInterface[]>
```

### getNextAddress

```typescript
marina.getNextAddress(): Promise<AddressInterface>
```

### getNextChangeAddress

```typescript
marina.getNextChangeAddress(): Promise<AddressInterface>
```

### sendTransaction

```typescript
marina.sendTransaction(recipients: Recipient[], feeAssetHash?: string ): Promise<SentTransaction>
```

`feeAssetHash` is an optional parameter. The default value is the network's L-BTC asset hash.
If another asset hash is specified, Marina will use Liquid Taxi to pay fees. [getFeeAssets](#getFeeAssets) lets to know the assets supported as `feeAssetHash`.

### blindTransaction

```typescript
marina.blindTransaction(pset: PsetBase64): Promise<PsetBase64>;
```

### signTransaction

```typescript
marina.signTransaction(pset: PsetBase64): Promise<PsetBase64>;
```

### signMessage

```typescript
marina.signMessage(message: string): Promise<SignedMessage>;
```

### getCoins

```typescript
marina.getCoins(): Promise<Utxo[]>;
```

### getTransactions

```typescript
marina.getTransactions(): Promise<Transaction[]>;
```

### getBalances

```typescript
marina.getBalances(): Promise<Balance[]>;
```

### getFeeAssets

```typescript
marina.getFeeAssets(): Promise<string[]>;
```

> Returns the list of assets that can be used to pay transaction fees.

### on

```typescript
marina.on(type: MarinaEventType, callback: (payload: any) => void): EventListenerID;
```

> Returns a `string` unique ID using to identity the listener.

### off

```typescript
marina.off(listenerId: EventListenerID): void;
```

> `off` stops the listener identified by `listenerId`.

## Marina events

Marina emits events when the wallet state is changing. The user can capture these events using `marina.on`, and cancel the listeners with `marina.off`.

_The callback's payload type depends on event type_

### NEW_UTXO

`NEW_UTXO` is emitted when Marina fetches a new unspent output from explorer.

| Event type | Payload type |
| ---------- | ------------ |
| "NEW_UTXO" | `Utxo`       |

```typescript
// print the utxo's txid each time Marina emits NEW_UTXO
marina.on("NEW_UTXO", (payload: any) => console.log((payload as Utxo).txid));
```

### SPENT_UTXO

`SPENT_UTXO` is emitted when an unspent output has been spent by any transaction.

| Event type   | Payload type                      |
| ------------ | --------------------------------- |
| "SPENT_UTXO" | `{ txid: string; vout: number; }` |

```typescript
marina.on("SPENT_UTXO", (payload: any) => {
  const { txid, vout } = payload;
  console.log(`output with txid=${txid} and vout=${vout} has been spent`)
}
```

### NEW_TX

`NEW_TX` is emitted when Marina fetches a transaction from explorer.

| Event type | Payload type  |
| ---------- | ------------- |
| "NEW_TX"   | `Transaction` |

```typescript
// print the tx's txid each time Marina emits NEW_TX
marina.on("NEW_TX", (u: any) => console.log((u as Transaction).txid));
```

### ENABLED

`ENABLED` is emitted when the active hostname is enabled by the user.

| Event type | Payload type |
| ---------- | ------------ |
| "ENABLED"  | `undefined`  |

```typescript
marina.enable(); // this will open the enable popup. the user can accept or reject.
marina.on("ENABLED", () => console.log("the user has accepted"));
```

### DISABLED

`DISABLED` is emitted when the active hostname is disabled by the user.

| Event type | Payload type |
| ---------- | ------------ |
| "DISABLED" | `undefined`  |

```typescript
marina.on("DISABLED", () =>
  console.log("the current hostname is now disabled")
);
marina.disable(); // this will emit a "DISABLED" event.
```

### NETWORK

The `NETWORK` event is emitted when the Marina's network config has changed.

| Event type | Payload type            |
| ---------- | ----------------------- |
| "NETWORK"  | `string` (network name) |

```typescript
marina.on("NETWORK", (payload: string) => {
  if (payload === "regtest") {
    // the user has switched from "liquid" to "regtest".
    console.log("regtest is boring");
  }
});
```

## Utils

### detectProvider

The `detectProvider` function aims to fetch the providers injected by the browser extension.

```typescript
const myProvider = await detectProvider<ProviderType>('providerName', 10000);
const marina = await detectProvider<MarinaProvider>('marina'); // default timeout = 3000
```
> Under the hood, the function listens the `providerName#initialized` event emitted by the browser extension script.

## TypeScript specification

_MarinaProvider_ : https://github.com/vulpemventures/marina-provider/blob/master/src/index.ts
