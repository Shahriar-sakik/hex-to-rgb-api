/**
 * Integration tests for the Express route /api/hex-to-rgb.
 * Supertest sends real HTTP requests to the app without opening a port.
 */

const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('GET /api/hex-to-rgb (integration tests)', () => {
  it('returns 200 and RGB values for a valid hex', async () => {
    const response = await request(app).get('/api/hex-to-rgb?hex=ff5733');

    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.match(/json/);
    expect(response.body).to.deep.equal({
      hex: 'ff5733',
      rgb: { r: 255, g: 87, b: 51 },
    });
  });

  it('accepts a hex with an encoded # prefix', async () => {
    const response = await request(app).get('/api/hex-to-rgb?hex=%23ff0000');

    expect(response.status).to.equal(200);
    expect(response.body.rgb).to.deep.equal({ r: 255, g: 0, b: 0 });
  });

  it('accepts a 3 digit shorthand', async () => {
    const response = await request(app).get('/api/hex-to-rgb?hex=0f0');

    expect(response.status).to.equal(200);
    expect(response.body.rgb).to.deep.equal({ r: 0, g: 255, b: 0 });
  });

  it('returns 400 when the hex parameter is missing', async () => {
    const response = await request(app).get('/api/hex-to-rgb');

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.include('required');
  });

  it('returns 400 for an invalid hex value', async () => {
    const response = await request(app).get('/api/hex-to-rgb?hex=zzzzzz');

    expect(response.status).to.equal(400);
    expect(response.body.error).to.include('Invalid hex color');
  });

  it('returns 400 for a hex value with the wrong length', async () => {
    const response = await request(app).get('/api/hex-to-rgb?hex=ff57');

    expect(response.status).to.equal(400);
  });

  it('returns 400 when the hex parameter is repeated', async () => {
    const response = await request(app).get('/api/hex-to-rgb?hex=ff0000&hex=00ff00');

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
  });

  it('returns 404 for an unknown route', async () => {
    const response = await request(app).get('/api/unknown');

    expect(response.status).to.equal(404);
  });
});
