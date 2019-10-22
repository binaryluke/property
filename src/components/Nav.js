import React from 'react';
import styles from './Nav.module.css';

function Nav({onNavigateTo, showListing}) {
  return (
    <ul className={styles.container}>
      <li onClick={() => onNavigateTo('MAP')}>Map</li>
      {showListing && <li onClick={() => onNavigateTo('LISTING')}>Listing</li>}
      <li onClick={() => onNavigateTo('LEGEND')}>Legend</li>
    </ul>
  );
}

Nav.defaultProps = {
  onNavigateTo: () => null,
  showListing: false,
};

export default Nav;
