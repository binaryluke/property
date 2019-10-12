import React from 'react';

function Listing({displayPrice}) {
  return (
    <div>
      <span>{displayPrice}</span>
    </div>
  );
}

Listing.defaultProps = {
  displayPrice: '',
};

export default Listing;
