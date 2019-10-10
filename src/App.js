import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import dataset from './data/clayton.response.json';

import './App.css';

window.dataset = dataset;

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmluYXJ5bHVrZSIsImEiOiJjazFqNWIyNTYxM3d2M2dzMGc5eHJmdDV6In0.GSRpcHwrbqB3IWKrwaDKUg';

// Data to be used by the LineLayer
const data = [{sourcePosition: [145.0603463, -37.903704], targetPosition: [145.1824093, -37.956786]}];

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
    new LineLayer({id: 'line-layer', data})
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
