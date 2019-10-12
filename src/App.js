import React from 'react';
import Map from './components/Map';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <Map />
      </div>
      <div className={styles.listing}>
        <span>Listing</span>
      </div>
      <div className={styles.status}>
        <span>Status</span>
      </div>
      <div className={styles.legend}>
        <span>Legend</span>
      </div>
    </div>
  );
}

export default App;
