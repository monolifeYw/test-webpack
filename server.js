'use strict';

/**
 * @todo
 * - Worker error Error: No code sections found
 * -> https://github.com/FormidableLabs/webpack-dashboard/issues/189
 */


/**
 * module path 지정
 * Node.js 모듈 검색 경로에 최상위 수준 앱 모듈 전용 디렉토리를 추가
 * @see https://www.npmjs.com/package/app-module-path
 *
 * node 에서 실행시에만 적용이 되므로,
 * resource(src/js/~~~) 에서 require 설정시 webpack 에서 compile시를 감안하여 상대경로로 지정한다.
 */
require('app-module-path').addPath(process.cwd());

const http = require('http');
const express = require('express');
const vhost = require('vhost');
const { HOSTS, SERVER } = require('app-config');
const app = express();
const appWebpackTest = require('server-conf/server-webpack');

// 가상 호스트
app.use(vhost(HOSTS.WEBPACK_TEST, appWebpackTest));

const server = http.createServer(app);

server.listen(SERVER.PORT);
server.on(SERVER.EVENTS.LISTENING, onListening);
server.on(SERVER.EVENTS.ERROR, onError);

function onListening() {
  console.log('onListening : ', HOSTS.WEBPACK_TEST, server.address());
}

function onError(err) {
  console.log('onError', err);
}
