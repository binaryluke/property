import React from 'react';

function Listing({displayPrice, url}) {
  const urlText = url
    ? 'Visit Listing on Domain'
    : '';

  return (
    <div>
      <span>{displayPrice}</span>
      <br />
      <a href={url} target="_blank">{urlText}</a>
    </div>
  );
}

Listing.defaultProps = {
  displayPrice: '',
  url: '',
};

export default Listing;
