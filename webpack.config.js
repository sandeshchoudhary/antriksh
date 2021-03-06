const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';

const devtool = isProd ? 'source-map' : 'cheap-module-eval-source-map';

function getBabelConfig() {
  return {
    presets: [
      'env',
      'babel-preset-es2015',
      'react',
      [
        'babel-preset-env',
        {
          targets: {
            browsers: ['last 2 versions']
          }
        }
      ]
    ],
    ignore: [],
    plugins: [
      [
        'transform-strict-mode',
        {
          strict: false
        }
      ],
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind'
    ]
  };
}

const entry = isProd
  ? ['babel-polyfill', './index.js']
  : [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',
      'babel-polyfill',
      './index.js'
    ];

const output = {
  filename: 'bundle.js',
  path: __dirname + '/dist',
  publicPath: '/dist/',
  library: `[name]`,
  chunkFilename: 'chunk.[name].[chunkhash].js'
};

const plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.HotModuleReplacementPlugin()
];

if (isProd) {
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8
      }
    })
  );
}

module.exports = {
  context: __dirname + '/src',
  devtool,
  entry: entry,
  mode,
  output: output,
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader',
            query: getBabelConfig()
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html?$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'sass-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)($|\?)/,
        loader: 'url-loader?limit=65000'
      }
    ]
  },
  plugins: plugins
};
