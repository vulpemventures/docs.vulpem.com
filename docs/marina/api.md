---
id: api
title: API reference
image: /img/marina_logo.svg
---

:::tip
We recommend that all web developers read from the [Getting started](getting-started) section and onward .
:::

Marina injects a global API into websites visited by its users at window.marina. This API allows websites to request users' Liquid addresses and blinding keys, read data about the blockchain the user is connected to, and suggest that the user sign messages and send transactions.

```javascript
const marina = window.marina;
if (marina) {
  // From now on, this should always be true:
  // marina === window.marina
  initApp(marina); // initialize your app
} else {
  console.log("Please install Marina extension!");
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

- [isEnabled](#isEnabled)
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
- [getTransactions](#getTransactions)
- [getCoins](#getCoins)
- [getBalances](#getBalances)
- [on](#on)
- [off](#off)

### isEnabled

```typescript
marina.isEnabled(): Promise<boolean>
```

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
marina.sendTransaction(recipientAddress: string, amountInSatoshis: number, assetHash: string ): Promise<TransactionHex>
```

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

_The callback's payload type depends on event type_

| _Event type_   | NEW_UTXO | SPENT_UTXO               | ENABLED | DISABLED | NEW_TX        | NETWORK                 |
| -------------- | -------- | ------------------------ | ------- | :------: | ------------- | ----------------------- |
| _Payload type_ | `Utxo`   | `Outpoint` (txid + vout) | /       |    /     | `Transaction` | `string` (network name) |

## TypeScript specification

```typescript
export interface AddressInterface {
  confidentialAddress: string;
  blindingPrivateKey: string;
  derivationPath?: string;
}

export interface SignedMessage {
  signature: SignatureBase64;
  address: NativeSegwitAddress;
}

export enum TxStatusEnum {
  Confirmed = 1,
  Pending = 0,
}

export interface Transaction {
  txId: string;
  status: TxStatusEnum;
  fee: number;
  transfers: Array<{ asset: string; amount: number }>;
  explorerURL: string;
  blocktimeMs: number;
}

export interface Utxo {
  txid: string;
  vout: number;
  asset?: string;
  value?: number;
}

export interface Balance {
  asset: {
    assetHash: string;
    ticker?: string;
    name?: string;
    precision: number;
  };
  amount: number;
}

export type MarinaEventType =
  | "NEW_UTXO"
  | "NEW_TX"
  | "SPENT_UTXO"
  | "ENABLED"
  | "DISABLED"
  | "NETWORK";

export type TransactionHex = string;
export type PsetBase64 = string;
export type SignatureBase64 = string;
export type NativeSegwitAddress = string;
export type EventListenerID = string;

export interface MarinaProvider {
  enable(): Promise<void>;

  disable(): Promise<void>;

  isEnabled(): Promise<boolean>;

  setAccount(account: number): Promise<void>;

  getNetwork(): Promise<"liquid" | "regtest">;

  getAddresses(): Promise<AddressInterface[]>;

  getNextAddress(): Promise<AddressInterface>;

  getNextChangeAddress(): Promise<AddressInterface>;

  sendTransaction(
    recipientAddress: string,
    amountInSatoshis: number,
    assetHash: string
  ): Promise<TransactionHex>;

  blindTransaction(pset: PsetBase64): Promise<PsetBase64>;

  signTransaction(pset: PsetBase64): Promise<PsetBase64>;

  signMessage(message: string): Promise<SignedMessage>;

  getCoins(): Promise<Utxo[]>;

  getTransactions(): Promise<Transaction[]>;

  getBalances(): Promise<Balance[]>;

  on(type: MarinaEventType, callback: (payload: any) => void): void;
}
```
