'use strict';

const $ = require('jquery');
const tmpl = require('partials/pc/partials-test');

module.exports = () => {
  $(() => {
    console.log('DOM READY PC');
    $('#_wrap').append(tmpl());
  });
};