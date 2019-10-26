import React, {useRef, useEffect, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {GridCellLayer} from '@deck.gl/layers';
import {WebMercatorViewport} from '@deck.gl/core';
import {InteractiveMap} from 'react-map-gl';
import useComponentSize from '@rehooks/component-size';
import styles from './Map.module.css';
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


// Viewport settings
let VIEW_STATE_DEFAULTS = {
  zoom: 13,
  pitch: 50,
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
  const ref = useRef(null);
  const {width, height} = useComponentSize(ref);
  const [viewState, setViewState] = useState({
    ...VIEW_STATE_DEFAULTS,
  });

  // Update view state when default location changes
  useEffect(() => {
    if (!defaultLocation) return;
    setViewState({
      ...viewState,
      longitude: defaultLocation && defaultLocation.longitude,
      latitude: defaultLocation && defaultLocation.latitude,
    });
  }, [defaultLocation]);

  // Update view state when the map is resized
  useEffect(() => {
    setViewState({
      ...viewState,
      width,
      height,
    });
  }, [width, height]);

  // Delay rendering Deck GL & Mapbox until we have access keys and default location
  if (!token || !defaultLocation) return <div className={styles.container} ref={ref} />;

  const layers = [
    new GridCellLayer(getLayer(listings, onChangeSelectedListing))
  ];

  return (
    <div ref={ref} className={styles.container}>
      <DeckGL
        viewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={({viewState}) => {
          setViewState(viewState);
          const {center, nw, se} = getMapMoveParams(viewState);
          onMapMove(center, nw, se, viewState.zoom);
        }}
        onLoad={() => {
          // Let parent component know the initial latitude/longitude of the map
          const {center, nw, se} = getMapMoveParams(viewState);
          onMapMove(center, nw, se, viewState.zoom);
        }}
      >
        <InteractiveMap
          mapboxApiAccessToken={token}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        />
      </DeckGL>
    </div>
  );
}

Map.defaultProps = {
  token: '',
  listings: [],
  onChangeSelectedListing: () => null,
  onMapMove: () => null,
};

export default Map;
