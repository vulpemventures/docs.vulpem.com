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



## Browser detection

To verify if the browser is running Marina, copy and paste the code snippet below in the developer console of your web browser:

```js
if (typeof window.marina !== 'undefined') {
  console.log('Marina is installed!');
}
```

You can review the full API for the `window.marina` object [here](api.md).


## Running in RegTest

Don't be too reckless. You should develop your applications against a local testnet. Marina defaults to `http://localhost:3001` wich is the REST API endpoint of the Electrs-compatible server exposed by [Nigiri box](https://vulpem.com/nigiri). You can download and run an Electrs instance from [here](https://github.com/blockstream/electrs), but we strongly suggest Nigiri which setup a complete RegTest environment in one click. Moreover the Electrs-compatible server exposed adds nice features for developers suchs as `/mint` and `/faucet` endpoints with automatic block generation and a Liquid asset registry similar to what Blockstream maintains.

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

We suggest using [liquidjs-lib](https://www.npmjs.com/package/liquidjs-lib) or [LDK](https://www.npmjs.com/package/ldk), a much more high level development kit, that uses `liquidjs-lib` under the hood.