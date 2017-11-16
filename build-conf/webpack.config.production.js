// enviornments
const { ENV, BUILD } = require('../app-config');

// webpack
const webpack = require('webpack');

// manifest
const ManifestPlugin = require('webpack-manifest-plugin');

// package.json
const { version } = require('../package.json');

const ManifestURL = `manifest-${version}.json`;

module.exports = () => {

  const BUILD_HASH = (ENV === 'development') ? 'bundle' : '[chunkhash:8]';

  return {

    // source-map
    devtool: '#source-map',

    // output
    output: {
      path: BUILD.BUILD_PATH,
      filename: `[name].${BUILD_HASH}.min.js`,
      chunkFilename: `[name].[id].${BUILD_HASH}.min.js`,
      libraryTarget: 'umd',
    },

    /*output: {
      path: BUILD.BUILD_PATH,
      filename: '[name]-bundle.js',
      chunkFilename: '[name]-[id].bundle.js',
    },*/

    plugins: [
      // manifest
      new ManifestPlugin({
        fileName: ManifestURL,
      }),

      // uglify plugin
      new webpack.optimize.UglifyJsPlugin({
        // 난독화
        mangle: false,
        // 가독성
        beautify: false,
        // compress: true, tree shaking
        compress: {
          warnings: true,
          // optional: don't convert foo["bar"] to foo.bar
          properties: false,
          // unused: true
        },
        output: {
          // 주석 삭제 여부
          comments: false,
          quote_keys: true, // eslint-disable-line camelcase
        },

        // migration
        sourceMap: true,
      }),
    ],
  };
};
