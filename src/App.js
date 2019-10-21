import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Title from './components/Title';
import Map from './components/Map';
import Listing from './components/Listing';
import Legend from './components/Legend';
import Status from './components/Status';
import styles from './App.module.css';

const INITIAL_MAP_BOUNDS = {
  centerLon: 0,
  centerLat: 0,
  nwLon: 0,
  nwLat: 0,
  seLon: 0,
  seLat: 0,
};

const getListings = (mapBounds) => {
  return axios.get('/property-api/listings', {
    params: mapBounds,
  });
};

function App() {
  const [mapToken, setMapToken] = useState();
  const [listings, setListings] = useState([]);
  const [isListingLimitExceeded, setIsListingLimitExceeded] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState();
  const [lastSearchMapBounds, setLastSearchMapBounds] = useState(INITIAL_MAP_BOUNDS);
  const [mapBounds, setMapBounds] = useState(INITIAL_MAP_BOUNDS);

  useEffect(() => {
    axios.get('/property-api/tokens').then(({data}) => setMapToken(data.mapGL));
  });

  const selectedListing = listings.find(l => l.id === selectedListingId);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.map}>
          <Map
            token={mapToken}
            listings={listings}
            onChangeSelectedListing={setSelectedListingId}
            onMapMove={(center=[], nw=[], se=[]) => {
              // Handle edge case where map sends us undefined prior to map initilisation
              if (center.length !== 2 || nw.length !== 2 || se.length !== 2) return;

              // Parameters sent in format `[longitude, latitude]`
              setMapBounds({
                centerLon: center[0],
                centerLat: center[1],
                nwLon: nw[0],
                nwLat: nw[1],
                seLon: se[0],
                seLat: se[1],
              });
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
            isSearchDisabled={lastSearchMapBounds === mapBounds}
            onClickSearch={() => {
              setLastSearchMapBounds(mapBounds);
              getListings(mapBounds)
                .then(({data}) => {
                  const {listings, isListingLimitExceeded} = data;
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
    </div>
  );
}

export default App;
