import React from 'react';
import styles from './Listing.module.css';

function Listing({displayPrice, url, images}) {
  const urlText = url
    ? 'Visit Listing on Domain'
    : '';

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          src={images[0] || ''}
          width="250px"
          alt="Property"
        />
      </div>
      <div className={styles.price}>
        <span>{displayPrice}</span>
      </div>
      <div className={styles.link}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          {urlText}
        </a>
      </div>
    </div>
  );
}

Listing.defaultProps = {
  displayPrice: '',
  url: '',
  images: [],
};

export default Listing;
