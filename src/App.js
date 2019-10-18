import React, {useState, useEffect} from 'react';
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
  const [mapToken, setMapToken] = useState();
  const [listings, setListings] = useState([]);
  const [isListingLimitExceeded, setIsListingLimitExceeded] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState();
  const selectedListing = listings.find(l => l.id === selectedListingId);
  const [lastSearchLongitude, setLastSearchLongitude] = useState(0);
  const [lastSearchLatitude, setLastSearchLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    axios.get('/property-api/tokens').then(({data}) => setMapToken(data.mapGL));
  });

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <Map
          token={mapToken}
          listings={listings}
          onChangeSelectedListing={setSelectedListingId}
          onMapMove={(nextLongitude, nextLatitude) => {
            setLongitude(nextLongitude);
            setLatitude(nextLatitude);
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
          <div>Click on a listing to see details</div>
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
