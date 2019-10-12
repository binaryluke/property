import React from 'react';
import styles from './Legend.module.css';
import {
  PROPERTY_TYPE_HOUSE,
  PROPERTY_TYPE_TOWNHOUSE,
  PROPERTY_TYPE_AUF
} from '../util/constants';

const COLOR_MAP = {
  [PROPERTY_TYPE_HOUSE]: '#ff4133',
  [PROPERTY_TYPE_TOWNHOUSE]: '#338bff',
  [PROPERTY_TYPE_AUF]: '#33ffa7',
};

const LABEL_MAP = {
  [PROPERTY_TYPE_HOUSE]: 'House',
  [PROPERTY_TYPE_TOWNHOUSE]: 'Townhouse',
  [PROPERTY_TYPE_AUF]: 'Apartment / Unit / Flat',
};

const TYPES = [
  PROPERTY_TYPE_HOUSE,
  PROPERTY_TYPE_TOWNHOUSE,
  PROPERTY_TYPE_AUF,
];

function Legend() {

  return (
    <div className={styles.container}>
      {TYPES.map(type => (
        <div className={styles.type}>
          <div className={styles.color}>
            <div style={{ backgroundColor: COLOR_MAP[type] }} />
          </div>
          <div className={styles.label}>
            <span>{LABEL_MAP[type]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Legend;
