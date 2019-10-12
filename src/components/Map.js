import React from 'react';
import DeckGL from '@deck.gl/react';
import {GridCellLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import dataset from '../data/clayton.response.json';

const PROPERTY_TYPE_HOUSE = 'House';
const PROPERTY_TYPE_TOWNHOUSE = 'Townhouse';
const PROPERTY_TYPE_AUF = 'ApartmentUnitFlat';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmluYXJ5bHVrZSIsImEiOiJjazFqNWIyNTYxM3d2M2dzMGc5eHJmdDV6In0.GSRpcHwrbqB3IWKrwaDKUg';

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
    coordinates: [
      listing.propertyDetails.longitude,
      listing.propertyDetails.latitude,
    ],
  }));

const layer = {
  id: 'grid-cell-layer',
  data: listings,
  pickable: true,
  extruded: true,
  cellSize: 50,
  elevationScale: 1,
  getPosition: d => d.coordinates,
  getFillColor: d => {
    if (d.type === PROPERTY_TYPE_HOUSE) return [255, 65, 51]; // #ff4133
    else if (d.type === PROPERTY_TYPE_TOWNHOUSE) return [51, 139, 255]; // #338bff
    else if (d.type === PROPERTY_TYPE_AUF) return [51, 255, 167]; // #33ffa7
    return [0, 0, 0];
  },
  getElevation: d => Math.sqrt(d.price),//d.value,
  onHover: ({object, x, y}) => {
    if (!object) return;
    const tooltip = `price: ${object.price}`;
    console.log(tooltip);
  }
}


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
    new GridCellLayer(layer)
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      />
    </DeckGL>
  );
}

export default App;
