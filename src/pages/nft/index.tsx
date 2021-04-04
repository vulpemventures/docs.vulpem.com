import React, { useState, useEffect } from 'react';
import Mint from './mint';
import Issuances from './issuances';

import { MarinaProvider } from 'marina-provider';

import styles from '../styles.module.css';

interface Props { }



const NFT: React.FC<Props> = ({ }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [installed, setInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [chain, setChain] = useState<'liquid' | 'regtest'>('liquid');
  const [addresses, setAddresses] = useState([]);

  let isCheckingMarina: boolean = false;
  let interval: any;

  useEffect(() => {
    if (typeof (window as any).marina === 'undefined') {
      return;
    }

    interval = setInterval(checkIfMarinaConnected, 2000);

    //Clean up
    return () => {
      clearInterval(interval);
    };
  }, []);


  const checkIfMarinaConnected = async () => {
    try {
      if (isCheckingMarina) return;
      isCheckingMarina = true;

      const marina: MarinaProvider = (window as any).marina;
      setInstalled(true);

      const isEnabled = await marina.isEnabled();
      setConnected(isEnabled);

      const net = await marina.getNetwork();
      setChain(net);

      const addrs = await (window as any).marina.getAddresses();
      setAddresses(addrs);

      setIsLoading(false);
      isCheckingMarina = false;
    } catch (_) {
      setIsLoading(false);
      isCheckingMarina = false;
    }
  }


  const connectWithMarina = async () => {
    await (window as any).marina.enable()
  }

  if (isLoading) {
    return (
      <div className={styles.main}>Loading..</div>
    );
  }

  if (!installed) {
    return (
      <div className={styles.main}>Install Marina extension</div>
    );
  }

  return (
    connected ?
      <div className="container">
        <p className={styles.main}>Connected - Network {chain}</p>
        <Issuances addresses={addresses} chain={chain} />
        <br />
        <Mint />
      </div> :
      <div className={styles.main}>
        <button className="button button--primary" onClick={connectWithMarina}>
          Connect with Marina Wallet
        </button>
      </div>
  );
}



export default NFT;