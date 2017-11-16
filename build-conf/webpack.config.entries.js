// env
const { PATHS } = require('app-config');

// debug
const debug = require('debug')('webpack:config:entries');

// entries - Common (vendor)
const entryCommon = require('src/entries/common/entries-common');

// entryLoader
// entry 폴더안에서 entry 구성 진행
const entryLoader = require('./lib/entryLoader');

// entries - Resource
const entryResourcePc = entryLoader(PATHS.ENTRIES_DIR, 'pc/**/*.js');
const entryResourceMobile = entryLoader(PATHS.ENTRIES_DIR, 'm/**/*.js');
const entryResource = Object.assign({}, entryResourcePc);

// final entry
const entry = Object.assign({}, entryCommon, entryResource);

debug(`Webpack Entries : ${JSON.stringify(entry)}`);

module.exports = () => entry;
