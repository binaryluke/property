import React from 'react';
import styles from './Status.module.css';

function Status({numListings, isListingLimitExceeded, isSearchDisabled, onClickSearch}) {
  const highlistClassName = isListingLimitExceeded
    ? styles.numListingsExceeded
    : '';

  return (
    <div className={styles.container}>
      <div className={styles.listings}>
        <span>Listings: </span>
        <span className={highlistClassName}>{numListings}</span>
        {isListingLimitExceeded && <span className={highlistClassName}>+</span>}
      </div>
      {isListingLimitExceeded && <div className={styles.refine}>
        <span className={highlistClassName}>Refine your search area to see all listings</span>
      </div>}
      <div className={styles.search}>
        <button disabled={isSearchDisabled} onClick={onClickSearch}>Search Map Area</button>
      </div>
    </div>
  );
}

Status.defaultProps = {
  numListings: 0,
  isListingLimitExceeded: false,
  isSearchDisabled: true,
  onClickSearch: () => null,
};

export default Status;
