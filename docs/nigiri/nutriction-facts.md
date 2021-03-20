---
id: nutrition-facts
title: Nutrition Facts
image: /img/nigiri_logo.svg
---


`Chopsticks` service exposes on port `3000` (and on `3001` if started with `--liquid` flag) all [Esplora's available endpoints](https://github.com/blockstream/esplora/blob/master/API.md) and extends them with the following:


### Bitcoin & Liquid

- `POST /faucet` which expects a body `{ "address": <receiving_address> }` 
- `POST /tx` has been extended to automatically mine a block when is called.

### Liquid only

- `POST /mint` which expects a body `{"address": "ert1q90dz89u8eudeswzynl3p2jke564ejc2cnfcwuq", "quantity": 1000, "name":"VULPEM", "ticker":"VLP"}` 
- `POST /registry` to get extra info about one or more assets like `name` and `ticker` which expects a body with an array of assets `{"assets": ["2dcf5a8834645654911964ec3602426fd3b9b4017554d3f9c19403e7fc1411d3"]}`

