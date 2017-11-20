'use strict';

const router = require('express').Router();

const Locals = {
  title: 'Proto Webpack',
};

function extendLocals(resLocals, opts = {}) {
  return Object.assign(resLocals, Locals, opts);
}

// render page
function render(page) {
  return function render(req, res) {
    res.locals = extendLocals(res.locals, {
      renderPage: page,
    });
    /**
     * Router 내 render 설정
     * @example
     * - res.render('layouts/pc/test', { title: 'Ryan', layout: 'pc/default' });
     * -> pc/default 내에 있는 {{{body}}} 내에 {app.set('views', PATHS.VIEW_DIR);}/layouts/pc/test.hbs 의 내용 삽입
     */
    res.render(page, { layout: 'pc/default' });

    /**
     * @todo express Can't set headers after they are sent
     */
    // next();
  };
}

router
  .route('/')
  .get((req, res) => {
    res.locals = extendLocals(res.locals);
    /**
     * Router 내 render 설정
     * @example
     * - res.render('layouts/pc/test', { title: 'Ryan', layout: 'pc/default' });
     * -> pc/default 내에 있는 {{{body}}} 내에 {app.set('views', PATHS.VIEW_DIR);}/layouts/pc/test.hbs 의 내용 삽입
     */
    res.render('pages/pc/main', { layout: 'pc/default' });
  });

router
  .route('/main')
  .get(render('pages/pc/main'));


// error (404)
router.use(function (req, res, next) {
  const err = new Error(`${req.url} is not Found!!!`);
  err.status = 404;
  next(err);
});

module.exports = router;