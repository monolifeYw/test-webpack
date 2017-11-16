const { resolve, join } = require('path');

// argv
const { argv } = require('yargs')
  .option('profile', {
    default: false,
    type: 'boolean',
    describe: 'Analysis for Webpack build',
  })
  .option('env', {
    default: {
      // Analysis for Webpack build : Boolean Type
      analysis: false,
    },
    describe: 'choose enviornments for build',
  })
  .help();


// Root
const BASEPATH = process.cwd();

// 구동 환경 (default `development`)
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// webpack 로컬 테스트시 vm 사용 고려
const HOSTS = {
  WEBPACK_TEST: 'proto-wp.monolife.com',
};

// 서버 Set
const SERVER = {
  PORT: 7777,
  EVENTS: {
    LISTENING: 'listening',
    ERROR: 'error',
  },
};

// paths
const PATHS = {
  // root path
  BASE_DIR: BASEPATH,

  SOURCE_DIR: resolve(BASEPATH, 'src'),

  JS_DIR: resolve(BASEPATH, 'src/js'),

  ENTRIES_DIR: resolve(BASEPATH, 'src/entries'),

  VIEW_DIR: resolve(BASEPATH, 'src/templates'),

  LAYOUT_DIR: resolve(BASEPATH, 'src/templates', 'layouts'),

  PARTIAL_DIR: resolve(BASEPATH, 'src/templates', 'partials'),

  HELPER_DIR: resolve(BASEPATH, 'src/templates', 'helpers'),
  // build set directory
  BUILD_SET_DIR: resolve(BASEPATH, 'build-conf'),
};

// build
const BUILD = {
  // ANALYSIS_MODE
  ANALYSIS_MODE: !!(argv['profile'] && argv.env.analysis),
  // Webpack entry
  CONFIG_INDEX: resolve(PATHS.BUILD_SET_DIR, 'webpack.config'),
  // Output directory name
  BUILD_DIRNAME: 'dist',
  // Output path
  BUILD_PATH: join(BASEPATH, 'dist'),
  // Public path
  PUBLIC_PATH: '/dist/',
  // Webpack base config
  CONFIG_BASE: resolve(PATHS.BUILD_SET_DIR, 'webpack.config.base'),
};

module.exports = {
  HOSTS,
  SERVER,
  PATHS,
  BUILD,
  ENV: ENVIRONMENT,
};