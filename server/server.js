const express = require('express')
const cors = require('cors')
const axios = require('axios')
const DOMAIN_REQUEST = require('./data/request.json');

if (!process.env.DOMAIN_API_KEY) {
  console.error('You must make your Domain API key available with the DOMAIN_API_KEY environment variable.');
  process.exit(1);
}

if (!process.env.MAPGL_ACCESS_TOKEN) {
  console.error('You must make your MapGL access token available with the MAPGL_ACCESS_TOKEN environment variable.');
  process.exit(1);
}

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(DOMAIN_REQUEST);
}

const PROPERTY_TYPE_HOUSE = 'House';
const PROPERTY_TYPE_TOWNHOUSE = 'Townhouse';
const PROPERTY_TYPE_AUF = 'ApartmentUnitFlat';

const DOMAIN_API_URI = `https://api.domain.com.au/v1/listings/residential/_search?api_key=${process.env.DOMAIN_API_KEY}`;

const app = express();
const port = 8888;

const isListingLimitExceeded = response => response.length >= 200;
const parseListings = response => response
  .filter(item => item.type === 'PropertyListing')
  .map(item => ({
    propertyDetails: {},
    priceDetails: {},
    media: [],
    ...item.listing,
  }))
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

app.get('/tokens', (req, res) => res.json({
  mapGL: process.env.MAPGL_ACCESS_TOKEN,
}));

app.get('/listings', (req, res) => {
  // Map bounds from client request
  const {
    centerLon,
    centerLat,
    nwLon,
    nwLat,
    seLon,
    seLat,
  } = req.query;

  const domainRequestBody = {
    ...DOMAIN_REQUEST,
  };

  domainRequestBody.sort.proximityTo.lon = centerLon;
  domainRequestBody.sort.proximityTo.lat = centerLat;
  domainRequestBody.geoWindow.box.topLeft.lon = nwLon;
  domainRequestBody.geoWindow.box.topLeft.lat = nwLat;
  domainRequestBody.geoWindow.box.bottomRight.lon = seLon;
  domainRequestBody.geoWindow.box.bottomRight.lat = seLat;

  axios.post(DOMAIN_API_URI, domainRequestBody)
    .then(response => {
      console.log(response.data);
      res.json({
        listings: parseListings(response.data),
        isListingLimitExceeded: isListingLimitExceeded(response.data),
      });
    })
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`Luke Howard\'s Property API listening on port ${port}!`));
