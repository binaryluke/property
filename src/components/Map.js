import React, {useEffect, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {GridCellLayer} from '@deck.gl/layers';
import {WebMercatorViewport} from '@deck.gl/core';
import {StaticMap} from 'react-map-gl';
import {
  PROPERTY_TYPE_HOUSE,
  PROPERTY_TYPE_TOWNHOUSE,
  PROPERTY_TYPE_AUF
} from '../util/constants';

const getLayer = (listings, changeSelectedListing) => ({
  id: 'grid-cell-layer',
  data: listings,
  pickable: true,
  extruded: true,
  cellSize: 50,
  elevationScale: 0.001,
  getPosition: d => d.coordinates,
  getFillColor: d => {
    if (d.type === PROPERTY_TYPE_HOUSE) return [255, 65, 51]; // #ff4133
    else if (d.type === PROPERTY_TYPE_TOWNHOUSE) return [51, 139, 255]; // #338bff
    else if (d.type === PROPERTY_TYPE_AUF) return [51, 255, 167]; // #33ffa7
    return [0, 0, 0];
  },
  getElevation: d => d.price,
  onClick: ({object}) => {
    if (!object) return;
    changeSelectedListing(object.id);
  }
});


// Viewport settings - default to Melbourne
let VIEW_STATE_DEFAULTS = {
  zoom: 13,
  pitch: 120,
  bearing: 0
};

const getMapMoveParams = viewState => {
  const viewport = new WebMercatorViewport(viewState);

  const center = [viewState.longitude, viewport.latitude];
  const nw = viewport.unproject([0, 0]);
  const se = viewport.unproject([viewport.width, viewport.height]);

  return {
    center,
    nw,
    se,
  };
}

function Map({token, defaultLocation, listings, onChangeSelectedListing, onMapMove}) {
  const initialViewState = {
    ...VIEW_STATE_DEFAULTS,
    longitude: defaultLocation && defaultLocation.longitude,
    latitude: defaultLocation && defaultLocation.latitude,
  }

  // useEffect(() => {
  //   // Let parent component know the initial latitude/longitude of the map
  //   if (token && defaultLocation) {
  //     const {center, nw, se} = getMapMoveParams(initialViewState);
  //     onMapMove(center, nw, se, initialViewState.zoom);
  //   }
  // }, [token, defaultLocation]);

  if (!token || !defaultLocation) return null;

  const layers = [
    new GridCellLayer(getLayer(listings, onChangeSelectedListing))
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      onViewStateChange={({viewState}) => {
        console.log('hi');
        const {center, nw, se, zoom} = getMapMoveParams(viewState);
        onMapMove(center, nw, se, viewState.zoom);
      }}
    >
      <StaticMap
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      />
    </DeckGL>
  );
}

Map.defaultProps = {
  token: '',
  listings: [],
  onChangeSelectedListing: () => null,
  onMapMove: () => null,
};

export default Map;
