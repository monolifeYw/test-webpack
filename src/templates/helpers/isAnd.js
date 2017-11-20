/**
 * and 조건 검색
 * @description and 조건 검색
 * @author lyw31136
 * @since 2017.07.11
 */

'use strict';

/**
 * Block helper that renders the block if **both** of the given values
 * are truthy. If an inverse block is specified it will be rendered
 * when falsy.
 *
 * @example
 *   {{#isAnd a b}}TRUE{{else}}FALSE{{/isAnd}}
 * @name isAnd
 * @param {*} a `a`
 * @param {*} b `b`
 * @param {Object} options `options` Handlebars provided options object
 * @return {string} Block, or inverse block if specified and falsey
 * @block
 * @api public
 */
module.exports = function isAnd(a, b, options) {
  if (a && b) {
    return options.fn(this);
  }
  return options.inverse(this);
};
