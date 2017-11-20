const { PATHS } = require('app-config');
const express = require('express');
const webpackMiddleware = require('server-conf/webpackMiddleware');
const app = express();
const router = require('./server-webpack-router');

// parsing from data from express
const bodyParser = require('body-parser');

const expressHbs = require('express-handlebars');

const hbs = expressHbs.create({
  defaultLayout: 'index',
  extname: 'hbs',
  layoutsDir: PATHS.LAYOUT_DIR,
  partialsDir: PATHS.PARTIAL_DIR,

  /**
   * set helper
   * @example
   * - express-handlebars 는 { helper-name1: helper-value1, helper-name2: helper-value2 }
   *   처럼 하나의 hashmap 안에 helper들을 열거하여야 한다.
   */
  helpers: require('server-conf/server-handlebars'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', PATHS.VIEW_DIR);

// cache
// app.enable('view cache');

// url 로 인코딩 된 부분을 해석
app.use(bodyParser.urlencoded({ extended: true }));

// webpack middleware
app.use(webpackMiddleware());

// router
app.use(router);

// error : final 처리
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const stack = err.stack;
  res.status(status).json( { status, err, stack } );
});

module.exports = app;
