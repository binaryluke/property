import React from 'react';
import styles from './Status.module.css';

function Status({numListings, onClickSearch}) {
  return (
    <div className={styles.container}>
      <div className={styles.listings}>
        <span>Listings: </span>
        <span>{numListings}</span>
      </div>
      <div className={styles.refine}>
        <span>Refine your search area to see all properties</span>
      </div>
      <div className={styles.search}>
        <button onClick={onClickSearch}>Search Map Area</button>
      </div>
    </div>
  );
}

Status.defaultProps = {
  numListings: 0,
  onClickSearch: () => null,
};

export default Status;
