import React, { useEffect, useState } from 'react';
import LightniteCard from './lightniteCard';
import { AddressInterface, fetchAndUnblindUtxos } from 'ldk';

import lightniteList from './lightnite_asset_hash'

import styles from '../styles.module.css';


interface Props {
  addresses: AddressInterface[];
  chain: 'liquid' | 'regtest'
}

const Issaunces: React.FC<Props> = ({ addresses, chain }) => {

  const [balances, setBalances] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const utxoInterfaces = await fetchAndUnblindUtxos(
        addresses,
        chain === 'liquid' ? 'https://blockstream.info/liquid/api' : 'http://localhost:3001'
      );

      const balances = groupByAsset(utxoInterfaces);
      console.log(balances);
      setBalances(balances);
      setIsLoading(false);
    })();
  }, []);


  const renderLoading = () => (
    <div className={styles.main}>Loading..</div>
  );

  const renderEmpty = () => (
    <div className="container">
      <p>
        Your NFTs will appear here.
    </p>
    </div>
  );

  const assets: string[] = Object.keys(balances).filter(a => lightniteList.includes(a));
  const isEmpty = assets.length === 0;

  return (
    <div className="container">
      <h1>My NFTs</h1>
      <div className="row">
        {isLoading && renderLoading()}
        {!isLoading && isEmpty && renderEmpty()}
        {
          !isLoading && !isEmpty && assets.map((hash, index) => (
            <div className="col col--3" key={index}>
              <LightniteCard hash={hash} />
            </div>
          ))
        }
      </div>
    </div>
  );
}


const groupByAsset = (utxos: any) => {
  return utxos.reduce(
    (storage: { [x: string]: any }, item: { [x: string]: any; value: any }) => {
      // get the first instance of the key by which we're grouping
      var group = item['asset'];

      // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
      storage[group] = storage[group] || 0;

      // add this item to its group within `storage`
      storage[group] += item.value;

      // return the updated storage to the reduce function, which will then loop through the next
      return storage;
    },
    {}
  );
}




export default Issaunces;