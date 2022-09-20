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

To request a topup you need to specify the service fee asset, an approximatively estimation of the size of your tx (take into account that Taxi always adds 1 input, 1 output and the fee output to it) and the sats/vByte ratio expressed in mSats/vB (`1 sats/vB = 1000 mSats/vB`).  

```js
const fetchTopupWithAsset = async (targetAsset) => {
  const { data, status } = await axios.post(
    `${taxiBaseUrl}/v1/asset/topup`,
    { assetHash: targetAsset, estimated_tx_size: 300, millisat_per_byte: 100 }
  );
  if (status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

async function main() {
  try {
    const topup = await fetchTopupWithAsset(usdt);
    console.log('Topup details:', topup);
  } catch(e) {
    console.error(e);
  }
}

main();
```

The relevant info included in the response are:
* the pset to which you can add as many inputs and outputs you want as long as the tx size doesn't exceed the limit imposed by the fixed fee output. Trying to change the 
* the expiration time after which Taxi revokes its input by sending it back to one of its addresses.
* the input blinding data (amount, asset and relative blinders) in case you want to make the transaction confidential.


The complete version of the tutorial with instructions to run a live demo can be found on [Github](https://github.com/vulpemventures/taxi-tutorial).