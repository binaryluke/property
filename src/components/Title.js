import React from 'react';
import logo from './logo.png';
import styles from './Title.module.css';

function Title() {

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={logo} alt="Luke Howard's Logo" />
      </div>
      <div className={styles.title}>
        <h1>Luke Howard - Property App</h1>
        <h2>Visualise prices of property on sale in Australia</h2>
      </div>
    </div>
  );
}

export default Title;
