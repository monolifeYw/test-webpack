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
  helpers: PATHS.HELPER_DIR,
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
