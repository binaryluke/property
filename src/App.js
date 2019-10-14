import React, {useState} from 'react';
import axios from 'axios';
import Map from './components/Map';
import Listing from './components/Listing';
import Legend from './components/Legend';
import Status from './components/Status';
import styles from './App.module.css';

const getListings = ({longitude, latitude, radius}) => {
  return axios.get('/property-api/listings', {
    params: {
      longitude,
      latitude,
      radius,
    },
  });
};

function App() {
  const [listings, setListings] = useState([]);
  const [isListingLimitExceeded, setIsListingLimitExceeded] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState();
  const selectedListing = listings.find(l => l.id === selectedListingId);
  const [lastSearchLongitude, setLastSearchLongitude] = useState(0);
  const [lastSearchLatitude, setLastSearchLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <Map
          listings={listings}
          onChangeSelectedListing={setSelectedListingId}
          onMapMove={(longitude, latitude) => {
            setLongitude(longitude);
            setLatitude(latitude);
          }}
        />
      </div>
      <div className={styles.listing}>
        {selectedListing && <Listing
          displayPrice={selectedListing && selectedListing.displayPrice}
          url={selectedListing && selectedListing.url}
          images={selectedListing && selectedListing.images}
        />}
        {!selectedListing && <div className={styles.noListing}>
          <div>Hover over a listing to see details</div>
        </div>}
      </div>
      <div className={styles.status}>
        <Status
          numListings={listings.length}
          isListingLimitExceeded={isListingLimitExceeded}
          isSearchDisabled={(longitude === lastSearchLongitude) && (latitude === lastSearchLatitude)}
          onClickSearch={() => {
            getListings({longitude, latitude, radius: 2000})
              .then(({data}) => {
                const {listings, isListingLimitExceeded} = data;
                console.log(listings);
                setLastSearchLongitude(longitude);
                setLastSearchLatitude(latitude);
                setListings(listings);
                setIsListingLimitExceeded(isListingLimitExceeded);
              });
          }}
        />
      </div>
      <div className={styles.legend}>
        <Legend />
      </div>
    </div>
  );
}

export default App;
