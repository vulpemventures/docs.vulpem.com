---
id: topup-with-asset
title: Topup with asset
image: /img/taxi_logo.svg
---

The following tutorial demonstrates how to use Taxi HTTP JSON APIs to retrieve a topup tx.

Let's say, for example, that you want to transfer your USDt funds to somebody but you don't have any LBTC to pay for network fees.

You can check if Taxi supports paying for network fees in exchange for a USDt service fee.

```js
const axios = require('axios');

const taxiBaseUrl = 'https://stage-api.liquid.taxi';
const usdt = 'f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958';

const fetchAssets = async () => {
  const { data, status } = await axios.get(`${taxiBaseUrl}/v1/assets`);
  if (status !== 200) {
    throw new Error(data.message);
  }
  const assets = data.assets.map(details => details.assetHash);
  if (assets.length === 0) {
    throw new Error('Taxi list of supported assets is empty');
  }
  return assets;
}

const assetSupportedByTaxi = async (target) => {
  const assets = await fetchAssets();
  return assets.find(a => a === target) !== undefined;
}

async function main() {
  try {
    // Retrieve the list of supported assets.
    if (!await assetSupportedByTaxi(usdt)) {
      throw new Error('Taxi does not support usdt as topup service fee');
    }
  }
}

main();
```

To request a topup you need to specify the service fee asset, an approximate estimation of the size of your tx (take into account that Taxi always adds 1 input, 1 output and the fee output to it) and the sats/vByte ratio expressed in mSats/vB (`1 sats/vB = 1000 mSats/vB`).

```js
const fetchTopupWithAsset = async (targetAsset) => {
  const { data, status } = await axios.post(`${taxiBaseUrl}/v1/asset/topup`, {
    assetHash: targetAsset,
    estimatedTxSize: 300,
    millisatPerByte: 100,
  });
  if (status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

async function main() {
  try {
    const topup = await fetchTopupWithAsset(usdt);
    console.log('Topup details:', topup);
  } catch (e) {
    console.error(e);
  }
}

main();
```

The response object returned by the HTTP JSON endpoint is like the following:

```json
{
  "topup": {
    "topupId": "f4ee76e8-54cd-491d-a222-e403dcb782e3",
    "partial": "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"
  },
  "expiry": "1663770843",
  "assetHash": "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958",
  "assetAmount": "11000000",
  "inBlindingData": [
    {
      "asset": "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
      "value": "500",
      "assetBlinder": "OEcE1xA/okJ75IGI6XA3ABt4MgmuKdUxxPwVoPboElo=",
      "valueBlinder": "Qs0a8O3cGFHCzjtzCSQnn8oFYobJBKd4RatS2oKyHJ8="
    }
  ]
}
```

- `topup.topupId` is the id of the topup that Taxi uses internally to uniquely identify it.
- `topup.partial` is the pset created by Taxi to which you can add inputs and outputs to transfer your funds. The tx contains exactly 1 LBTC input and 2 outputs. The input is entirely spent by the fee output. The maximum final tx size, or the number of inputs and outputs you can add to it, depends on the fee amount and the sats/vByte ratio you passed in the request. The second output is the service fee, that you must pay with your funds.
- `expiry` is the unix timestamp of the expiration date for the topup. After that date, if Taxi doesn't see the topup tx included in blockchain, it takes care of creating another tx and transfer the same input to one of its addresses. Any later attempt to broadcast the topup tx fails because Taxi's input has already been spent.
- `assetHash` is the service fee asset, exactly the one passed in the request object.
- `assetAmount` is the service fee amount that you must pay with your own funds.
- `inBlindingData` is the list of unblinded data of the confidential inputs added by Taxi to the topup tx (always 1 tx input, therefore 1 entry). Includes the unblinded asset, value and relative blinders. Note that the blinders are encoded in base64 standard encoding instead of "normal" hex encoding, just because this is the standard format for the representation of raw bytes in HTTP JSON objects.

The complete version of the tutorial with instructions to run a live demo can be found on [Github](https://github.com/vulpemventures/taxi-tutorial).
