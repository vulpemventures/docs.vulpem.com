---
id: connect
title: Connect to Marina
image: /img/marina_logo.svg
---

"Connect" to Marina effectively means "to access the user's addresses and relative blinding keys". This is necessary to be able to create watch-only wallets or to build and properly fund transactions in your application.

* You should **never** initiate a connection request on page load.
* You should **only** initiate a connection request in response to direct user action before explaining the privacy implications, such as clicking a button.
* You should **always** explain the privacy implications of the user action.


## Enable 

Applications that need access to the wallet must first request that the extension is enabled.
```js
await window.marina.enable();
```

This will prompt the user to allow access to the wallet for the application.
<img src="/img/marina_connect_screenshot.png" alt="Marina Connect" width="300"/>

If the prompt is accepted, will be possible to call the APIs

## Disable

To disconnect
```js
await window.marina.disable();
```