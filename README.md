## Quickstart Guide

To run the application in development mode:

1. `make client-install && make server-install`
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

Further instructions to give guidance on this.

## Why did I build this application?

I watched a video from the Uber visualisation team talking about their open source library Deck.gl and had that "giddy" feeling us tech nerds get when we stumble across awesome tech for the first time. Reading more, I also learned about the incredible MapGL library which I had no idea about before.

I had an intense desire to build something with it, so I went searching for a data source. Been map based the first thing that came to mind was real estate. That led me to find the Domain API and I came up with the idea of visualising prices for property that is for sale.

This application is the result.

## Credit

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
