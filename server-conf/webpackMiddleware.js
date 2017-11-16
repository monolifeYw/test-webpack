/**
 * Webpack config
 * @author lyw31136
 */

'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const { BUILD } = require('app-config');

const webpackConfig = require(BUILD.CONFIG_INDEX);

// webpack dashboard
const DashboardPlugin = require('webpack-dashboard/plugin');

/**
 * Webpack Dev Middleware
 *
 * @param {Object} [config={}] Webpack Config, 빌드 설정을 일부 변경해야하는 경우 사용하며 Deep copy가 필요할 경우 추가 구현
 * @return {Object} webpackDevMiddleware instance
 */
module.exports = (config = {}) => {
  const _webpackConfig = Object.assign({}, webpackConfig, config);
  const webpackCompiler = webpack(_webpackConfig);
  webpackCompiler.apply(new DashboardPlugin());

  return webpackDevMiddleware(webpackCompiler, _webpackConfig.devServer);
};