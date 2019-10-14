const express = require('express');
const cors = require('cors')
const dataset = require('./data/clayton.response.json');

const PROPERTY_TYPE_HOUSE = 'House';
const PROPERTY_TYPE_TOWNHOUSE = 'Townhouse';
const PROPERTY_TYPE_AUF = 'ApartmentUnitFlat';

const app = express();
const port = 8888;

const isListingLimitExceeded = dataset.length >= 20;
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
    displayPrice: listing.priceDetails.displayPrice,
    url: `https://www.domain.com.au/${listing.listingSlug}`,
    images: listing.media
      .filter(m => m.category === 'Image')
      .map(m => m.url),
    coordinates: [
      listing.propertyDetails.longitude,
      listing.propertyDetails.latitude,
    ],
  }));

// Disable CORS for this API
app.use(cors());

app.get('/', (req, res) => {
  res.send('Luke Howard\'s Property API');
});

app.get('/listings', (req, res) => {
  const { longitude, latitude, radius } = req.query;
  console.log(longitude, latitude, radius);
  res.json({
    listings,
    isListingLimitExceeded,
  });
});

app.listen(port, () => console.log(`Luke Howard\'s Property API listening on port ${port}!`));
