/**
 * Method to format a number using default locale and default option
 * @param {Nunber} number - the number to format
 * @returns {String} - the formatter number
 */
export const formatNumber = (number: number) =>
  new Intl.NumberFormat().format(number)

/**
 * Validate a value to be a positive integer from 1 to 1000
 * @param {String|Number} value - value to be validated
 * @param {Boolean} - return true if validated, false otherwise
 */
export const validateQty = (value: string | number) => {
  if (!value) {
    return false
  }
  let str = String(value).trim()
  if (!str) {
    return false
  }
  str = str.replace(/^0+/, '') || '0'
  const n = Math.floor(Number(str))
  return String(n) === str && n >= 1 && n <= 1000
}
