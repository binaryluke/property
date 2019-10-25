import React, {useEffect} from 'react';
import DeckGL from '@deck.gl/react';
import {GridCellLayer} from '@deck.gl/layers';
import {WebMercatorViewport} from '@deck.gl/core';
import {InteractiveMap} from 'react-map-gl';
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
const initialViewState = {
  longitude: 144.96387836092487,
  latitude: -37.815738101632384,
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

function Map({token, listings, onChangeSelectedListing, onMapMove}) {
  useEffect(() => {
    // Let parent component know the initial latitude/longitude of the map
    const {center, nw, se} = getMapMoveParams(initialViewState);
    onMapMove(center, nw, se, initialViewState.zoom);
  }, []);

  const layers = [
    new GridCellLayer(getLayer(listings, onChangeSelectedListing))
  ];

  if (!token) return null;

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      onViewStateChange={({viewState}) => {
        const {center, nw, se, zoom} = getMapMoveParams(viewState);
        onMapMove(center, nw, se, viewState.zoom);
      }}
    >
      <InteractiveMap
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
