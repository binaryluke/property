import React from 'react';
import styles from './Status.module.css';

const MINIMUM_ZOOM_LEVEL = 12;

function Status({numListings, isListingLimitExceeded, hasMapMoved, onClickSearch, zoom}) {
  const highlistClassName = isListingLimitExceeded
    ? styles.numListingsExceeded
    : '';

  const isSearchEnabled = hasMapMoved && zoom >= MINIMUM_ZOOM_LEVEL;

  let statusText = '';

  if (zoom < MINIMUM_ZOOM_LEVEL) {
    statusText = 'Zoom in further before searching';
  } else if (isListingLimitExceeded) {
    statusText = 'Refine your search area to see all listings';
  }

  return (
    <div className={styles.container}>
      <div className={styles.listings}>
        <span>Listings: </span>
        <span className={highlistClassName}>{numListings}</span>
        {isListingLimitExceeded && <span className={highlistClassName}>+</span>}
      </div>
      <div className={styles.refine}>
        <span className={highlistClassName}>{statusText}</span>
      </div>
      <div className={styles.search}>
        <button disabled={!isSearchEnabled} onClick={onClickSearch}>Search Map Area</button>
      </div>
    </div>
  );
}

Status.defaultProps = {
  numListings: 0,
  zoom: 0,
  isListingLimitExceeded: false,
  hasMapMoved: false,
  onClickSearch: () => null,
};

export default Status;
