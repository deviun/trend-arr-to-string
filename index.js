const $Promise = require('bluebird');

// limit the numbers for one step
const STEP_LIMIT = 256;

/**
 * @class ArrReplacer
 * @description Replacer array of numbers to string
 */
class ArrReplacer {
  /**
   * @description Main replacer function
   * @param {Array} arr Array of numbers
   * @param {Number} stepLimit Limit the numbers for one step (by Default: STEP_LIMIT)
   */
  static async replace(arr, stepLimit = STEP_LIMIT) {
    if (!arr.length) {
      return '';
    }
    
    let offset = 0;
    let res = '';

    function _replace (resolve) {
      const chunk = arr.slice(offset, offset + stepLimit).join(',');

      res += res ? ',' + chunk : chunk;
      offset += stepLimit;

      if (offset >= arr.length) {
        return resolve();
      }

      setImmediate(_replace.bind(null, resolve));
    }

    await new $Promise((resolve) => setImmediate(_replace.bind(null, resolve)));
    return res;
  }
}

module.exports = ArrReplacer;