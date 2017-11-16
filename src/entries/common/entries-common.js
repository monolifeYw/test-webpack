// env
const { PATHS } = require('app-config');
const { resolve } = require('path');

const entryVendorCommon = ['babel-polyfill', resolve(PATHS.ENTRIES_DIR, 'common/vendor/vendor-common.js')];

module.exports = {
  'pc/vendor': entryVendorCommon,
  'm/vendor': entryVendorCommon.concat(resolve(PATHS.ENTRIES_DIR, 'common/vendor/vendor-m.js')),
};

