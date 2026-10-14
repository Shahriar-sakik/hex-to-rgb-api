/**
 * Hex to RGB library.
 *
 * Supported hex formats (with or without a leading "#"):
 *   - 6 digits, for example "ff5733" or "#FF5733"
 *   - 3 digits, for example "f00" or "#f00" (each digit is doubled)
 */

/**
 * Converts a hex color string to an RGB object.
 *
 * @param {string} hex - The hex color, for example "#ff5733".
 * @returns {{r: number, g: number, b: number}} Values from 0 to 255.
 * @throws {TypeError} If the input is not a string.
 * @throws {Error} If the string is not a valid 3 or 6 digit hex color.
 */
function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Hex value must be a string');
  }

  let cleanHex = hex.trim();

  if (cleanHex.startsWith('#')) {
    cleanHex = cleanHex.slice(1);
  }

  if (cleanHex.length === 3) {
    cleanHex =
      cleanHex[0] + cleanHex[0] +
      cleanHex[1] + cleanHex[1] +
      cleanHex[2] + cleanHex[2];
  }

  const isValid = /^[0-9a-fA-F]{6}$/.test(cleanHex);
  if (!isValid) {
    throw new Error('Invalid hex color: ' + hex);
  }

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return { r, g, b };
}

module.exports = { hexToRgb };
