import React, {useRef, useState, useEffect} from 'react';
import useComponentSize from '@rehooks/component-size';
import axios from 'axios';
import cn from 'classnames';
import Title from './components/Title';
import Map from './components/Map';
import Listing from './components/Listing';
import Legend from './components/Legend';
import Status from './components/Status';
import Nav from './components/Nav';
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

const hideArea = (areaName, selectedNavItem, isSmallWindow) => {
  if (isSmallWindow) {
    return selectedNavItem !== areaName;
  }
  return false;
};

function App() {
  const ref = useRef(null);
  const {width, height} = useComponentSize(ref);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  useEffect(() => {
    setIsSmallWindow(window.matchMedia('only screen and (max-width: 992px)').matches);
  }, [width, height]);
  const [selectedNavItem, setSelectedNavItem] = useState('MAP');
  const [mapToken, setMapToken] = useState();
  const [defaultLocation, setDefaultLocation] = useState();
  const [listings, setListings] = useState([]);
  const [isListingLimitExceeded, setIsListingLimitExceeded] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState();
  const [lastSearchMapBounds, setLastSearchMapBounds] = useState(INITIAL_MAP_BOUNDS);
  const [mapBounds, setMapBounds] = useState(INITIAL_MAP_BOUNDS);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    axios.get('/property-api/tokens').then(({data}) => {
      setMapToken(data.mapGL);
      setDefaultLocation(data.ipLocation);
    });
  }, []);

  const selectedListing = listings.find(l => l.id === selectedListingId);

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.titleContainer}>
        <Title />
      </div>
      <div className={styles.contentContainer}>
        <div className={cn({
          [styles.map]: true,
          [styles.hidden]: hideArea('MAP', selectedNavItem, isSmallWindow),
        })}>
          <Map
            token={mapToken}
            defaultLocation={defaultLocation}
            listings={listings}
            onChangeSelectedListing={listingId => {
              setSelectedListingId(listingId);
              setSelectedNavItem('LISTING');
            }}
            onMapMove={(center=[], nw=[], se=[], zoom) => {
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

              setZoom(zoom);
            }}
          />
        </div>
        <div className={cn({
          [styles.listing]: true,
          [styles.hidden]: hideArea('LISTING', selectedNavItem, isSmallWindow),
        })}>
          {selectedListing && <Listing
            displayPrice={selectedListing && selectedListing.displayPrice}
            url={selectedListing && selectedListing.url}
            images={selectedListing && selectedListing.images}
          />}
          {!selectedListing && <div className={styles.noListing}>
            <div>Click on a listing to see details</div>
          </div>}
        </div>
        <div className={cn({
          [styles.status]: true,
          [styles.hidden]: hideArea('MAP', selectedNavItem, isSmallWindow),
        })}>
          <Status
            numListings={listings.length}
            isListingLimitExceeded={isListingLimitExceeded}
            zoom={zoom}
            hasMapMoved={lastSearchMapBounds !== mapBounds}
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
        <div className={cn({
          [styles.legend]: true,
          [styles.hidden]: hideArea('LEGEND', selectedNavItem, isSmallWindow),
        })}>
          <Legend />
        </div>
      </div>
      <div className={styles.paneSelector}>
        <Nav onNavigateTo={navItem => setSelectedNavItem(navItem)} showListing={Boolean(selectedListing)} />
      </div>
    </div>
  );
}

export default App;
