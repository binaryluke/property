import React from 'react';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import dataset from './data/clayton.response.json';

import './App.css';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmluYXJ5bHVrZSIsImEiOiJjazFqNWIyNTYxM3d2M2dzMGc5eHJmdDV6In0.GSRpcHwrbqB3IWKrwaDKUg';

const listings = dataset
  .filter(item => item.type === 'PropertyListing')
  .map(item => item.listing)
  .map(listing => ({
    id: listing.id,
    price: listing.priceDetails.price,
    coordinates: [
      listing.propertyDetails.longitude,
      listing.propertyDetails.latitude,
    ],
  }));

const layer = {
  id: 'listings',
  data: listings,
  stroked: false,
  filled: true,
  getPosition: d => d.coordinates,
  getRadius: d => Math.sqrt(d.price)/8,
  getFillColor: [255, 200, 0]
};


// Viewport settings
const initialViewState = {
  longitude: 145.123716,
  latitude: -37.9310053,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

function App() {
  const layers = [
    new ScatterplotLayer(layer)
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;
