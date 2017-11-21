// enviornments
const { BUILD, HOSTS, SERVER } = require('../app-config');

// webpack
// const webpack = require('webpack');

// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = () => {

  return {

    // source-map
    devtool: '#eval',

    // entry에서 부터 구축한 의존성 트리를 바탕으로 만들어낸 번들이 어디에, 어떤 파일 이름으로 저장될지를 지정
    output: {
      // 빌드 결과물이 들어갈 (webpack.config.js로부터의) 상대 경로, Compile 된 Path 기준
      path: BUILD.BUILD_PATH,
      filename: '[name]-bundle.js',
      chunkFilename: '[name]-[id].bundle.js',
      publicPath: BUILD.PUBLIC_PATH,
      libraryTarget: 'umd',
    },

    // 번들링이 끝난 뒤 최종적으로 나온 번들을 조작하고 싶은 경우
    plugins: [],

    devServer: {

      // host
      host: HOSTS.WEBPACK_TEST,

      // port
      port: SERVER.PORT,

      // 브라우저 루트 아래로 이용가능한 번들 파일의 이름
      // 번들이 이미 동일한 URL 경로에 있는 경우 메모리의 번들이 우선순위가 높음
      publicPath: BUILD.PUBLIC_PATH,

      // error, warning을 console에서 안보이게 함
      quiet: false,

      // build Status 를 보여주지 않는다.
      noInfo: false,

      lazy: true,

      stats: {
        assets: true,
        colors: true,
        version: true,
        hash: true,
        timings: true,
        chunks: true,
        chunkModules: false,
        modules: false,

        // build 오류 상황을 상세히 표시
        errorDetails: false,
      },
    },
  };
};
