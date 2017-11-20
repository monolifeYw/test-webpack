'use strict';

const { PATHS } = require('app-config');
const { resolve, parse } = require('path');
const glob = require('glob');

module.exports = (function () {
  return glob
    .sync('**/*.js', { cwd: PATHS.HELPER_DIR })
    .reduce((helperLists, file) => {
      const { name, base } = parse(file);
      helperLists[name] = require(resolve(PATHS.HELPER_DIR, base));
      return helperLists;
    }, {});
})();

