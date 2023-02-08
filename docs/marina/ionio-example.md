---
id: ionio-example
title: Ionio Account
image: /img/marina_logo.svg
---

[Ionio](http://ionio-lang.org/docs/intro) is a smart contract language that allows you to write complex taproot contracts using simple data structures and APIs. 

Marina fully supports Ionio and allows you to derive taproot addresses embedding Ionio contract.

## Create an Ionio account

First of all, you need to create an Ionio account. This is a special type of account expecting a Ionio Artifact as input to derive a new address.

```js
import { AccountType } from 'marina-provider';

await marina.createAccount('myCustomIonioAccount', AccountType.Ionio); 
```

## Use your Ionio account

Once you created your Ionio account, you should be able to select it using `useAccount`.

```js
await marina.useAccount('myCustomIonioAccount');
```

### Generate addresses from Ionio artifact

Ionio artifact describes the contract of the script. 

[vault-calculator/calculator.json](https://github.com/louisinger/vault-calculator/blob/master/src/calculator.json) is an example of an Ionio artifact. The contract is expecting two inputs:
* `sum` which is a number letting to "lock" my coins using a simple math problem.
* `pubkey` which is the public key of the signer.

To spend a coin locking by that script I need to provide:
 * `a` and `b` which are the two numbers that sum up to `sum`
 * `sig` which is a schnoor signature belonging to `pubkey`

Marina is able to detect the artifact inputs and inject public keys and signatures automatically. To do this, the "injected" argument must be named like the account name. Fortunately, `@ionio-lang/ionio` provides us some helpers:

:::tip
`templateString` is an helper function using to rename `artifcat` arguments.
:::

:::tip
`marina.getNextAddress` and `marina.getNextChangeAddress` injects artifact constructor arguments automatically if and only if the argument name is the same as the account name (and the argument type is XOnlyPublicKey).
:::

```typescript
import { replaceArtifactConstructorWithArguments, templateString } from '@ionio-lang/ionio';

// assuming artifact is my vault-calculator `calculator.json`
const renamedArtifactForMarina = replaceArtifactConstructorWithArguments(
    artifact, 
    [
        templateString('sum'), // let's keep the same name for the sum arg
        templateString('myCustomIonioAccount') // 'pubkey' will be replaced by the account name 
    ]
);

// once the artifact is ready, we can pass it to marina getNextAddress
const address = await marina.getNextAddress({
    artifact: renamedArtifactForMarina,
    args: {
        // we don't need to provide the 'myCustomIonioAccount' argument, marina will inject it automatically
        // using the next available public key of the account
        // however, 'sum' is still required by marina in order to generate the right script
        sum: 10
    }    
});

console.log(address.confidentialAddress) // taproot address
```

### Spend coins owned by Ionio account

Get the coins owned by the Ionio account:

```js
const utxos = await marina.getCoins(['myCustomIonioAccount']);
```

```typescript
import { Contract, Signer } from '@ionio-lang/ionio';
import { Utxo, ScriptDetails, isIonioScriptDetails, detectProvider } from 'marina-provider';

const utxo: Utxo = utxos[0];
const scriptDetails: ScriptDetails = utxo.scriptDetails; // utxo contains all the data of the script locking the coin

if (isIonioScriptDetails(scriptDetails)) { 
    // IonioScriptDetails extends ScriptDetails and contains the artifact and the constructor parameters
    // including the injected marina account public keys
    const contract = new Contract(scriptDetails.artifact, scriptDetails.params);

    const FEE = 280; // fixed fee amount of my transaction (in satoshis)

    // our contract expect two numbers that sum up to 10
    const a = 4;
    const b = 6;
    // it also needs a schnoor signature belonging to the pubkey injected by marina
    // we need to provide a `Signer` object to the contract.
    const marinaSigner = {
        signTransaction: async (psetb64: string) => {
            const marina = await detectProvider();
            // signTransaction is a marina method that signs a pset
            // it will fill the pset with the schnoor signature expected by the contract
            const signed = await marina.signTransaction(psetb64);
            return signed;
        },
    }

    // we can now spend the coin using the contract
    const tx = contract.from(utxo.txid, utxo.vout, utxo.witnessUtxo, {
        asset: AssetHash.fromHex(utxo.blindingData.asset).bytesWithoutPrefix,
        value: utxo.blindingData.value.toString(10),
        assetBlindingFactor: Buffer.from(utxo.blindingData.assetBlindingFactor, 'hex'),
        valueBlindingFactor: Buffer.from(utxo.blindingData.valueBlindingFactor, 'hex'),
    })
    .functions.transferWithSum(a, b, marinaSigner)
    .withRecipient(recipient, amount - FEE, networks[coin.scriptDetails.network].assetHash, 0)
    .withFeeOutput(FEE);

    // unlock will fire the signTransaction method of the signer object
    // it will open a popup asking the user to sign the transaction
    const signerPset = await tx.unlock();
}
```

:::tip
More infos about how to spend an Ionio contract using the Javascript SDK: http://ionio-lang.org/docs/SDK/transactions
:::

You can try and test the full example here: https://github.com/louisinger/vault-calculator.

