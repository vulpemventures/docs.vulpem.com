---
id: getting-started
title: Getting Started
image: /img/marina_logo.svg
---

To develop for Marina, install Marina on your development machine. [Download here](https://vulpem.com/marina).

:::tip
This guide assumes intermediate knowledge of HTML, CSS, and JavaScript.
:::

Once Marina is installed and running, you should find that new browser tabs have a window.marina object available in the developer console. This is how your website will interact with Marina.

You can review the full API for that object [here](api.md). 

## Install marina-provider

To make things easier, we have created a package that provides utilities and common types related to Marina. 

```sh
npm install marina-provider
```

or using yarn
  
```sh
yarn add marina-provider
```

## Browser detection

To verify if the browser is running Marina, you can use the [marina-provider](https://www.npmjs.com/package/marina-provider) package that provides a function `detectProvider` to inspect and fetch the `window.marina` provider.


```javascript
import { detectProvider } from 'marina-provider';

try {
  const marina = await detectProvider('marina');
  // now the window.marina provider is available for use!
} catch (err) {
  console.log('Please install Marina extension!');
}
```
You can review the full API for the `window.marina` object [here](api.md).

## Connect to outside world

Marina is a Liquid wallet running in your browser. It connects to an [ElectrumX](https://electrumx.readthedocs.io/) Liquid instance. Marina is using the WebSocket protocol to connect to the ElectrumX server. Marina use the Blockstream's ElectrumX server by default. You can change the endpoint in the settings/explorer tab of your extension.

### Running in RegTest

Don't be too reckless. You should develop your applications against a local testnet. Marina defaults to `ws://localhost:1234` wich is the websocket endpoint of the Electrs-compatible server exposed by [Nigiri box](https://vulpem.com/nigiri). You can download and run an Electrs instance from [here](https://github.com/blockstream/electrs), but we strongly suggest Nigiri which setup a complete RegTest environment in one click. Moreover the Electrs-compatible server exposed adds nice features for developers suchs as `/mint` and `/faucet` endpoints with automatic block generation and a Liquid asset registry similar to what Blockstream maintains.

### Install Nigiri 

```sh
curl https://getnigiri.vulpem.com | bash 
```

### Start Nigiri with Liquid 

```sh
nigiri start --liquid
```

On [http://localhost:5001](http://localhost:5001) you can see Esplora frontend

## Choosing a JavaScript library

Browser libraries will help you develop faster your apps that handle Liquid transactions and doing operations such as creating, funding and build unsigned transactions or decode transaction built from other parties.

We suggest using [liquidjs-lib](https://www.npmjs.com/package/liquidjs-lib).