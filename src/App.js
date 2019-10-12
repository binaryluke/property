import React, {useState} from 'react';
import Map from './components/Map';
import Listing from './components/Listing';
import styles from './App.module.css';
import dataset from './data/clayton.response.json';
import {
  PROPERTY_TYPE_HOUSE,
  PROPERTY_TYPE_TOWNHOUSE,
  PROPERTY_TYPE_AUF
} from './util/constants';

const listings = dataset
  .filter(item => item.type === 'PropertyListing')
  .map(item => item.listing)
  .filter(listing => [
    PROPERTY_TYPE_HOUSE,
    PROPERTY_TYPE_TOWNHOUSE,
    PROPERTY_TYPE_AUF
  ].includes(listing.propertyDetails.propertyType))
  .map(listing => ({
    id: listing.id,
    type: listing.propertyDetails.propertyType,
    price: listing.priceDetails.price,
    displayPrice: listing.priceDetails.displayPrice,
    coordinates: [
      listing.propertyDetails.longitude,
      listing.propertyDetails.latitude,
    ],
  }));

function App() {
  const [displayPrice, setDisplayPrice] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <Map
          listings={listings}
          onChangeSelectedListing={id => setDisplayPrice(listings.find(l => l.id === id).displayPrice)}
        />
      </div>
      <div className={styles.listing}>
        <Listing displayPrice={displayPrice} />
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
