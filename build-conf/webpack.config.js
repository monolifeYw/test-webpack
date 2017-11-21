'use strict';

// env
const { ENV, BUILD } = require('../app-config');

// debug
const debug = require('debug')('webpack:config');

// base
const baseConf = require(BUILD.CONFIG_BASE);

// config
const webpackConfig = require(`./webpack.config.${ENV !== 'production' ? 'development' : ENV}`)();

// analyzerPlugin
if (BUILD.ANALYSIS_MODE) {
  const analyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new analyzerPlugin({
    // stat.json 파일 생성 유무
    generateStatsFile: false,

    // Log level. Can be 'info', 'warn', 'error' or 'silent'
    logLevel: 'info',
  }));
}

// plugins
webpackConfig.plugins = baseConf.plugins.concat(webpackConfig.plugins || []);

debug(`Webpack ENV - ENV : ${ENV}`);
debug(`Webpack Conf : ${JSON.stringify(Object.assign({}, baseConf, webpackConfig))}`);

module.exports = Object.assign({}, baseConf, webpackConfig);

