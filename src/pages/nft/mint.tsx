import React from 'react';
import styles from '../styles.module.css';

interface Props { }

const Mint: React.FC<Props> = ({ }) => {
  return (
    <div className="container">
      <h1>Mint</h1>

      <p>
        Create your own NFT on Liquid!
      </p>

      <div>
        <span className="badge badge--primary">Name</span>
        <input className={styles.input} type="text" placeholder="Input" />
      </div>

      <div>
        <span className="badge badge--primary">Ticker</span>
        <input className={styles.input} type="text" placeholder="Input" />
      </div>

      <div>
        <span className="badge badge--primary">Image URL</span>
        <input className={styles.input} type="text" placeholder="Input" />
      </div>

      <button className="button button--primary">
        Issue
      </button>
    </div>
  );
}

export default Mint