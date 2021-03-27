import React, { useState } from 'react';

const explorerApiUrl: Record<string, string> = {
  'regtest': 'http://localhost:3001',
  'liquid': 'https://blockstream.info/liquid/api',
};


interface Props { }


const MarinaExample: React.FC<Props> = () => {


  const [connected, setConnected] = useState(false);
  const [tx, setTx] = useState('');
  const [network, setNetwork] = useState<'liquid' | 'regtest'>('regtest');
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  const marina: MarinaProvider = (window as any).marina;

  const getNetwork = async () => {
    try {


    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  const enable = async () => {
    try {
      const net = await marina.getNetwork();
      setNetwork(net);

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
      const rawtx = await marina.sendTransaction(
        "Azpq3eq1oZhPYTvB21n8t4FqDvvNhXLbuF1UnaAuWV8oGPUqYdXXJNmsmoZKvmcxLSHwLoVhddCuGpDQ",
        50000,
        "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225"
      );
      console.log(rawtx);
      setTx(rawtx);

    } catch (e) {
      console.error(e);
      setError(e.message);
    }

  }

  const push = async () => {
    console.log(`${explorerApiUrl[network]}/tx`)
    const response = await fetch(
      `${explorerApiUrl[network]}/tx`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/text',
        },
        body: tx
      }
    );
    if (!response.ok) {
      console.error("not ok")
    }
    const data = await response.text();
    console.log(data);

    setTxHash(data);
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
      <button onClick={send}>
        Send 50k satoshis of LBTC
        </button>
      {
        tx.length > 0 &&
        <>
          <p>
            {tx.substring(0, 20) + "..."}
          </p>
          <button onClick={push}>
            Broadcast
            </button>
        </>
      }
      <p style={{ color: "red" }}>
        {error}
      </p>
      <p style={{ color: "darkgreen" }}>
        {txHash}
      </p>
    </div>
  );
}

export default MarinaExample;



interface AddressInterface {
  confidentialAddress: string;
  blindingPrivateKey: string;
  derivationPath?: string;
}

interface MarinaProvider {
  enable(): Promise<void>;
  disable(): Promise<void>;

  setAccount(account: number): Promise<void>;

  getNetwork(): Promise<'liquid' | 'regtest'>;

  getAddresses(): Promise<AddressInterface[]>;

  getNextAddress(): Promise<AddressInterface>;
  getNextChangeAddress(): Promise<AddressInterface>;

  sendTransaction(
    recipientAddress: string,
    amountInSatoshis: number,
    assetHash: string
  ): Promise<string>;

  blindTransaction(psetBase64: string): Promise<string>;
  signTransaction(psetBase64: string): Promise<string>;
}