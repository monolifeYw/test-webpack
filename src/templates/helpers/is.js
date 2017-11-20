/**
 * 관계 연산자 같음 처리
 * @author foundy
 * @since 2017.06.26
 */

'use strict';

/**
 * Block helper that renders a block if `a` is **equal to** `b`.
 * If an inverse block is specified it will be rendered when falsy.
 *
 * @example
 *   {{#is 1 1}}TRUE{{else}}FALSE{{/is}} // TRUE
 *   {{#is 1 2}}TRUE{{else}}FALSE{{/is}} // FALSE
 * @name is
 * @param {*} a `a`
 * @param {*} b `b`
 * @param {Object} options `options` Handlebars provided options object
 * @return {string} Block, or inverse block if specified and falsey
 * @block
 * @api public
 */
module.exports = function is(a, b, options) {
  if (arguments.length === 2) {
    options = b;
    b = options.hash.compare;
  }
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
};