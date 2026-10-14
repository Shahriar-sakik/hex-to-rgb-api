/**
 * Express application with the hex to RGB route.
 * The app is exported without calling listen, so tests can use it directly.
 */

const express = require('express');
const { hexToRgb } = require('./hexToRgb');

const app = express();

/**
 * GET /api/hex-to-rgb?hex=ff5733
 *
 * Query parameter "hex" is the hex color, with or without "#".
 * A "#" in a URL must be written as %23.
 *
 * Success: 200 { "hex": "ff5733", "rgb": { "r": 255, "g": 87, "b": 51 } }
 * Failure: 400 { "error": "message" }
 */
app.get('/api/hex-to-rgb', (req, res) => {
  const hex = req.query.hex;

  if (hex === undefined) {
    return res.status(400).json({ error: 'Query parameter "hex" is required' });
  }

  try {
    const rgb = hexToRgb(hex);
    return res.status(200).json({ hex: hex, rgb: rgb });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = app;
