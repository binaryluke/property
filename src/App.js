import React, {useState} from 'react';
import Map from './components/Map';
import Listing from './components/Listing';
import Legend from './components/Legend';
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
    url: `https://www.domain.com.au/${listing.listingSlug}`,
    images: listing.media
      .filter(m => m.category === 'Image')
      .map(m => m.url),
    coordinates: [
      listing.propertyDetails.longitude,
      listing.propertyDetails.latitude,
    ],
  }));

function App() {
  const [selectedListingId, setSelectedListingId] = useState();
  const selectedListing = listings.find(l => l.id === selectedListingId) || {};
  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <Map
          listings={listings}
          onChangeSelectedListing={setSelectedListingId}
        />
      </div>
      <div className={styles.listing}>
        <Listing
          displayPrice={selectedListing.displayPrice}
          url={selectedListing.url}
          images={selectedListing.images}
        />
      </div>
      <div className={styles.status}>
        <span>Status</span>
      </div>
      <div className={styles.legend}>
        <Legend />
      </div>
    </div>
  );
}

export default App;
