// webpack
const webpack = require('webpack');

const { resolve } = require('path');

// env
const ENV = require('../app-config');

// entries
const entries = require('./webpack.config.entries');

// plugin : 대소문자 구별
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// babel loader Options
const babelOpts = {
  pc: {
    presets: ['es2015'],
    plugins: [
      'transform-es3-property-literals',
      'transform-es3-member-expression-literals',
    ],
    ignore: [],
    babelrc: false,
  },

  mobile: {
    presets: ['es2015'],
    plugins: [],
    ignore: [],
    babelrc: false,
  },
};

/**
 * 모듈 리스트
 * - Build 시 babel, plugins 에서 적용하지 말아야 하는(exclude) 리스트
 * - 기본적인 작성 js include 기준으로 포함
 */
const excludeLists = {
  pc: [
    resolve(ENV.PATHS.ENTRIES_DIR, 'pc'),
    resolve(ENV.PATHS.JS_DIR, 'pc'),
  ],

  mobile: [
    resolve(ENV.PATHS.ENTRIES_DIR, 'm'),
    resolve(ENV.PATHS.JS_DIR, 'm'),
    resolve(ENV.PATHS.HELPER_DIR),
  ],
};

const baseConf = {

  /**
   * 모듈 해석
   context 를 기준으로 entry poin 와 loaders 의 path를 절대적(absolute)으로, 해석(resolve) 한다.
   - 보통 해당 모듈의 기본 폴더를 지정
   //////////////////\n// WEBPACK FOOTER\n// ./entries/pc/example/example-test.js\n
   //////////////////\// module id = 356\n// module chunks = 2\n\n//#
   //////////////////\// sourceURL=webpack:///./entries/pc/example/example-test.js?");
   */
  context: ENV.PATHS.BASE_DIR,

  // build 시 warning, error 시의 Build에 대한 hard Checking 강화
  bail: false,

  // Webpack이 작동하는 의존성 트리의 루트 노드가 되는 진입점
  entry: entries,

  // require(모듈명)에서의 모듈명을 어떻게 해석할지에 대한 옵션
  resolve: {
    alias: {
      // Project 공통 alias
      'baseDir': resolve(ENV.PATHS.BASE_DIR),
      // js에 대한 공통 alias
      'js': resolve(ENV.PATHS.JS_DIR),
      // partials 에 대한 공통 alias
      'partials': resolve(ENV.PATHS.PARTIAL_DIR),
    },

    // 모듈명 뒤에 여기 명시된 확장자명들을 붙여보며 탐색을 수행
    extensions: ['.js', '.hbs'],

    // 모듈 탐색을 시작할 루트 경로
    modules: ['node_modules'],
  },

  // Node의 globals를 사용하기 위한 설정
  node: {
    __dirname: true,
    __filename: true,
  },

  externals: [

    // Handlebars
    {
      'handlebars/runtime': {
        root: 'Handlebars',
        amd: 'handlebars.runtime',
        commonjs2: 'handlebars/runtime',
        commonjs: 'handlebars/runtime',
      },

      'handlebars': {
        root: 'Handlebars',
        amd: 'Handlebars',
        commonjs: 'handlebars',
        commonjs2: 'handlebars',
      },
    },

    // jQuery
    {
      'jquery': 'jQuery',
    },

    /**
     * customAlert
     */
    {
      customAlert: 'customAlert',
    },

    /**
     * custom mobile utils
     */
    {
      mobileUtils: 'mobileUtils',
    },
  ],

  // 의존성 트리 내의 각 모듈들을 어떻게 핸들링할지에 대한 옵션.
  module: {
    rules: [
      // preload
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [ENV.PATHS.SOURCE_DIR],
        exclude: /(node_modules|dist)/,
      },

      /**
       * babel-loader 는 각 디바이스 별로 환경 구성
       * - PC, MOBILE 두개로 나뉨
       * - exclude 리스트 기준
       * -- 각 entries 및 src 를 기준으로 진행한다.
       */
      // babel-loader : PC
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOpts['pc'],
        include: [ENV.PATHS.SOURCE_DIR],
        exclude: [/(node_modules|dist)/].concat(excludeLists.mobile),
      },

      // babel-loader : Mobile
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOpts['mobile'],
        include: [ENV.PATHS.SOURCE_DIR],
        exclude: [/(node_modules|dist)/].concat(excludeLists.pc),
      },

      // js - es5 to es3
      {
        test: /\.js$/,
        enforce: 'post',
        loader: 'es3ify-loader',
        exclude: excludeLists.mobile,
      },

      // hbs
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              helperDirs: [
                ENV.PATHS.HELPER_DIR,
              ],
              partialDirs: [
                ENV.PATHS.PARTIAL_DIR,
              ],
              runtime: 'handlebars/runtime',
            },
          },
        ],
      },
    ],
  },

  // 번들링이 끝난 뒤 최종적으로 나온 번들을 조작하고 싶은 경우
  plugins: [

    // Case Sensitive Paths
    new CaseSensitivePathsPlugin(),

    // define - build 내에서 참조할 공통 define
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENV.ENV),
      },
    }),

    // Loader Options Plugin > eslint
    new webpack.LoaderOptionsPlugin({
      // minimize: true
      options: {
        eslint: {
          // Fail only on errors : 실패해도 빌드를 계속 진행할 것인지 유무
          failOnWarning: false,
          failOnError: true,
          cache: false,
        },
      },
    }),

    // global variables
    new webpack.BannerPlugin('*******************\n Bundling \n********************'),
  ],
};

module.exports = baseConf;
