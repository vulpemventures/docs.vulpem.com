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
- If the first time for the user, ask permissions to connect using `marina.enable()`
- Detect which network the user is connected to (either `liquid` or `regtest`) using `marina.getNetwork()`
- Get the user's Liquid addresses(s) and blinding keys using `marina.getNextAddress()`

The snippet at the top of this page is sufficient for detecting the provider.

The provider API is all you need to create a full-featured Liquid powered web application.

## API

### MarinaProvider

- [isEnabled](#isenabled)
- [isReady](#isready)
- [getAccountInfo](#getaccountinfo)
- [useAccount](#useaccount)
- [createAccount](#createaccount)
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

### createAccount

```typescript
marina.createAccount(accountID: AccountID, accountType: AccountType): Promise<void>;
```

Open a popup, ask the password locking the marina private key.
If the user accepts, marina will create a new account.

Account types are:
 * `AccountType.P2WPKH`: native segwit v0 account (default)
 * `AccountType.Ionio`: account using [Ionio](https://ionio-lang.org/) artifacts to generate taproot scripts.

:::tip
All accounts are *confidential* and generate blinding keys for each script according to [SLIP77](https://github.com/satoshilabs/slips/blob/master/slip-0077.md).
:::

### getAccountInfo

```typescript
marina.getAccountInfo(accountID: AccountID): Promise<AccountInfo>;
```
Get the account info of the account `accountID` if it exists. Returns an error otherwise.

```typescript
export interface AccountInfo {
  accountID: AccountID;
  type: AccountType; 
  masterXPub: string;
  baseDerivationPath: string; // path to masterXPub
  accountNetworks: NetworkString[]; // the account is available on these networks
}
```

### useAccount

```typescript
marina.useAccount(accountID: AccountID): Promise<void>;
```
Switch to account with ID = `accountID` if it exists. By default, current selected account is always "mainAccount".

### isEnabled

```typescript
marina.isEnabled(): Promise<boolean>
```

Returns whether the user has already granted permission to the website to access their wallet.
If this returns false, some methods will throw an error.

### isReady

```typescript
marina.isReady(): Promise<boolean>
Returns true if the user has already set up a wallet.

### enable

```typescript
marina.enable(): Promise<void>
```

Ask the user to grant permission to the website to access their wallet. It will open a popup and wait for the user response.

### disable

```typescript
marina.disable(): Promise<void>
```

Disable the website to access the user's wallet. It does not open any popup and does not need user interaction.

### getNetwork

```typescript
marina.getNetwork(): Promise<'liquid' | 'testnet' | 'regtest'>
```

Returns the network the wallet is connected to.

### getAddresses

```typescript
marina.getAddresses(accountIDs?: AccountID[]): Promise<Address[]>
```

Returns the addresses of the accounts selected by `accountIDs`. If undefined, returns the addresses of all accounts.

### getNextAddress

```typescript
marina.getNextAddress(ionioData?: ArtifactWithConstructorArgs): Promise<AddressInterface>
```
Generate and persist in Marina a new external address for the current selected account.
`ionioData` is expected if the current selected account is an Ionio account.

### getNextChangeAddress

```typescript
marina.getNextChangeAddress(ionioData?: ArtifactWithConstructorArgs): Promise<AddressInterface>
```
Generate and persist in Marina a new internal address for the current selected account.
`ionioData` is expected if the current selected account is an Ionio account.

### sendTransaction

```typescript
marina.sendTransaction(recipients: Recipient[], feeAssetHash?: string): Promise<SentTransaction>
```
`feeAssetHash` is an optional parameter. The default value is the network's L-BTC asset hash.
If another asset hash is specified, Marina will use Liquid Taxi to pay fees. [getFeeAssets](#getFeeAssets) lets to know the assets supported as `feeAssetHash`.

### blindTransaction

```typescript
marina.blindTransaction(pset: PsetBase64): Promise<PsetBase64>;
```

> blindTransaction is not implemented yet.

### signTransaction

```typescript
marina.signTransaction(pset: PsetBase64): Promise<PsetBase64>;
```
Marina will try to sign all the inputs of the transaction if it knows the blinding and signing keys of the spent outpoint.

### signMessage

```typescript
marina.signMessage(message: string): Promise<SignedMessage>;
```
Sign a message using the private key of the current selected account.

### getCoins

```typescript
marina.getCoins(accountIDs?: AccountID[]): Promise<Utxo[]>;
```
Returns the UTXOs of the accounts selected by `accountIDs`. If undefined, returns the UTXOs of all accounts.
`Utxo` contains all the data to spend the input (`witnessUtxo`, `blindingData` and `scriptDetails`).

### getTransactions

```typescript
marina.getTransactions(accountIDs?: AccountID[]): Promise<Transaction[]>;
```
Returns the transactions of the accounts selected by `accountIDs`. If undefined, returns the transactions of all accounts.

### getBalances

```typescript
marina.getBalances(accountIDs?: AccountID[]): Promise<Balance[]>;
```
Returns the balances of the accounts selected by `accountIDs`. If undefined, returns the balances of all accounts.

### getFeeAssets

```typescript
marina.getFeeAssets(): Promise<string[]>;
```
Returns the list of assets that can be used to pay transaction fees.

### on

```typescript
marina.on(type: MarinaEventType, callback: (payload: any) => void): EventListenerID;
```
Returns a `string` unique ID using to identity the listener.

### off

```typescript
marina.off(listenerId: EventListenerID): void;
```
`off` stops the listener identified by `listenerId`.


## Marina events

Marina emits events when the wallet state changes. The user can capture these events using `marina.on`, and cancel the listeners with `marina.off`.

_The callback's payload 'data' prop depends on event type:_

```typescript
interface MarinaEvent {
  accountID?: string;
  data: any;
}
```

### NEW_UTXO

`NEW_UTXO` is emitted when Marina fetches a new unspent output from explorer.

| Event type | Payload type                                   |
| ---------- | ---------------------------------------------- |
| "NEW_UTXO" | `{ accountID: string; data: UnblindedOutput }` |

```typescript
marina.on("NEW_UTXO", ({ accountID, data }: MarinaEvent) => {
  const { txid, vout } = data;
  console.log(`new utxo ${txid}:${vout} for account ${accountID}`);
})
```

### SPENT_UTXO

`SPENT_UTXO` is emitted when an unspent output has been spent by any transaction.

| Event type   | Payload type                                   |
| ------------ | ---------------------------------------------- |
| "SPENT_UTXO" | `{ accountID: string; data: UnblindedOutput }` |

```typescript
marina.on("SPENT_UTXO", ({ accountID, data }: MarinaEvent) => {
  const { txid, vout } = data;
  console.log(`output ${txid}:${vout} has been spent by account ${accountID}`);
})
```

### NEW_TX

`NEW_TX` is emitted when Marina fetches a transaction from explorer.

| Event type | Payload type                               |
| ---------- | ------------------------------------------ |
| "NEW_TX"   | `{ accountID: string; data: Transaction }` |

```typescript
// print the tx's txid each time Marina emits NEW_TX
marina.on("NEW_TX", ({ accountID, data }: MarinaEvent) => {
  const { txId } = data;
  console.log(`new tx ${txId} for account ${accountID}`);
})
```

### ENABLED

`ENABLED` is emitted when the active hostname is enabled by the user.

| Event type | Payload type |
| ---------- | ------------ |
| "ENABLED"  | `{ data: { hostname: string; network: NetworkString } }`  |

```typescript
marina.enable(); // this will open the enable popup. the user can accept or reject.
marina.on("ENABLED", () => console.log("the user has accepted"));
```

### DISABLED

`DISABLED` is emitted when the active hostname is disabled by the user.

| Event type | Payload type                                              |
| ---------- | --------------------------------------------------------- |
| "DISABLED" | `{ data: { hostname: string; network: NetworkString } }`  |

```typescript
marina.disable(); // this will emit a "DISABLED" event.
marina.on("DISABLED", () => console.log("the current hostname is now disabled"));
```

### NETWORK

The `NETWORK` event is emitted when the Marina's network config has changed.

| Event type | Payload type                      |
| ---------- | --------------------------------- |
| "NETWORK"  | `{ data: NetworkString }` (network name) |

```typescript
marina.on("NETWORK", ({ data }: MarinaEvent) => {
  if (data === "regtest") {
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
