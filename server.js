const express = require('express');
const app = express();
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const port = 3031;
const compiler = webpack(webpackConfig);
const fs = require('fs');
const storeDir = __dirname + '/public/';
var encoding = 'utf8';

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    contentBase: './dist',
    host: 'localhost'
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    reload: true,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })
);

app.use('/dist', express.static(__dirname + '/dist/'));
app.use('/public', express.static(__dirname + '/public'));

// viewed at http://localhost:3031
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function() {
  console.log('server running at ', port);
});
