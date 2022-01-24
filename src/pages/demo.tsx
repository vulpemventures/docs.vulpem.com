import React, { useEffect, useState } from 'react';
import { MarinaProvider } from 'marina-provider';

import copy from 'copy-to-clipboard';


const L_BTC: Record<string, string> = {
  'regtest': '5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225',
  'liquid': '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d'
}


interface Props { }


const MarinaExample: React.FC<Props> = () => {


  const [installed, setInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);
  const [network, setNetwork] = useState<'liquid' | 'regtest'>('liquid');
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  if (typeof window === "undefined") {
    return null;
  }

  const marina: MarinaProvider = (window as any).marina;


  useEffect(() => {
    void (async (): Promise<void> => {
      const isInstalled = typeof (window as any).marina !== 'undefined';
      setInstalled(isInstalled);

      if (!isInstalled)
        return;

      const isEnabled = await marina.isEnabled();
      setConnected(isEnabled);

      const net = await marina.getNetwork();
      setNetwork(net);
    })();
  }, [])

  const enable = async () => {
    try {
      // we enable the webiste
      await marina.enable();
      setConnected(true);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  const send = async () => {
    try {
      const txHash = await marina.sendTransaction([{
        address: recipient,
        value: amount,
        asset: L_BTC[network]
      }]);

      console.log(txHash);
      setTxHash(txHash);

    } catch (e) {
      console.error(e);
      setError(e.message || JSON.stringify(e));
    }

  }


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        fontSize: '20px',
        flexDirection: 'column',
      }}>
      <h1>
        Hello! Welcome to a Marina-powered Liquid web app
        </h1>
      <br />
      {
        installed ?
          <>
            <p>
              {`Marina is ${connected ? `enabled` : `disabled`}`}
            </p>
            <p>
              {connected && `Network: ${network}`}
            </p>
            {!connected &&
              <button onClick={enable}>
                Enable Marina to access your addresses
              </button>
            }
            <br />
            <label>
              Recipient (Liquid address)
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(evt: any) => setRecipient(evt.target.value)}
              style={{
                height: '50px',
                width: '350px'
              }}
            />
            <br />
            <label>
              Amount (in satoshis)
            </label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(evt: any) => setAmount(evt.target.value)}
              style={{
                height: '50px',
                width: '350px'
              }}
            />
            <br />
            <button
              onClick={send}
              style={{
                height: '50px',
                width: '350px'
              }}
            >
              Send LBTC
            </button>
            {
              txHash.length > 0 &&
              <>
                <p>
                  {txHash}
                </p>
                <button
                  onClick={() => copy(txHash)}
                  style={{
                    height: '50px',
                    width: '350px'
                  }}
                >
                  Copy to clipboard
                </button>
              </>
            }
            <p style={{ color: "red" }}>
              {error}
            </p>
          </> :
          <>
            <p>
              Marina is not installed
            </p>
          </>
      }
    </div>
  );
}

export default MarinaExample;


