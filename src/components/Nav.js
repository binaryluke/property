import React from 'react';
import styles from './Nav.module.css';

function Nav() {
  return (
    <ul className={styles.container}>
      <li>Map</li>
      <li>Listing</li>
      <li>Legend</li>
    </ul>
  );
}

Nav.defaultProps = {
  numListings: 0,
  isListingLimitExceeded: false,
  isSearchDisabled: true,
  onClickSearch: () => null,
};

export default Nav;
