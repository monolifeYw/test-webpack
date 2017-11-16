/**
 * Custom alert
 * @description eslint rule 기준으로 no-alert에 포함된 alert, confirm, prompt에 대한 처리들 묶음
 * @author foundy
 * @since 2017.08.10
 */

'use strict';

/**
 * Custom alert
 * @param {string} message alert message
 */
exports.alert = function customAlert(message) {
  alert(message); // eslint-disable-line no-alert
};

/**
 * Custom confirm
 * @param {string} message confirm message
 * @return {boolean} confirm result
 */
exports.confirm = function customConfirm(message) {
  return confirm(message); // eslint-disable-line no-alert
};

/**
 * Custom prompt
 * @param {string} message prompt message
 * @param {string} [defaultMessage=''] prompt defaultMessage
 * @return {boolean} prompt result
 */
exports.prompt = function customPrompt(message, defaultMessage = '') {
  return prompt(message, defaultMessage); // eslint-disable-line no-alert
};