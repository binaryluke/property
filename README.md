## What is Property?

Visualise relative property prices of For Sale real estate in Australia on a map.

The more expensive the property, the taller the column protruding from the map.

This is useful to see at a glance the relative prices of different properties in an area, and can help to identify price hot spots.

It can also be used as a simple property search when looking for Real Estate in Australia.

## Prerequisites

To run this application locally you need the following:

1. Docker
2. [Domain API key](https://developer.domain.com.au/docs/introduction)
3. [Mapbox GL access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/#creating-and-managing-access-tokens)

## Quickstart Guide

To run the application in development mode:

1. `make client-install && make server-install`
2. `export DOMAIN_API_KEY=xyz` where xyz is your Domain API key
3. `export MAPGL_ACCESS_TOKEN=xyz` where  xyz is your MapboxGL access token
2. `make server-start`
3. In another terminal window: `make client-start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

## Building & Packaging for Production

This application is designed to be deployed with Docker.

There are two images to build: `property-server` and `property-client`.

1. Update package.json: Change "homepage" to be the domain name you will serve the site from
2. Install dependencies: `make server-install && make client install`
3. Run the build: `make client-build`
4. Create Docker images: `make server-package && make client-package`

## Deploying to Production

Now that you've built your production ready Docker images, you need to deploy them.

There are various options, such as Kubernetes, ECS and Docker Compose.

Guidance on how to do this is currently outside the scope of this documentation but may be added later.

## Why did I build this application?

I watched a video from the Uber visualisation team talking about their open source library Deck.gl and had that "giddy" feeling us tech nerds get when we stumble across awesome tech for the first time. Reading more, I also learned about the incredible MapGL library which I had no idea about before.

I had an intense desire to build something with it, so I went searching for a data source. As a map based library the first thing that came to mind was real estate. That led me to find the Domain API and I came up with the idea of visualising prices for property that is for sale.

This application is the result.

## Credit

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Many thanks to Shan He from the Uber visualisation team for the [Uber Engineering: Data Visualization at Uber](https://youtu.be/nLy3OQYsXWA) presentation that inspired me.
