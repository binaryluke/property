const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/property-api', proxy({
    target: 'http://localhost:8888',
    pathRewrite: {
      '^/property-api/': '/' // remove base path
    }
  }));
};
