/**
 * Unit tests for the hexToRgb function.
 */

const { expect } = require('chai');
const { hexToRgb } = require('../src/hexToRgb');

describe('hexToRgb (unit tests)', () => {
  describe('valid input', () => {
    it('converts a 6 digit hex with # prefix', () => {
      expect(hexToRgb('#ff5733')).to.deep.equal({ r: 255, g: 87, b: 51 });
    });

    it('converts a 6 digit hex without # prefix', () => {
      expect(hexToRgb('ff5733')).to.deep.equal({ r: 255, g: 87, b: 51 });
    });

    it('accepts uppercase letters', () => {
      expect(hexToRgb('#FF5733')).to.deep.equal({ r: 255, g: 87, b: 51 });
    });

    it('expands a 3 digit shorthand', () => {
      expect(hexToRgb('#f00')).to.deep.equal({ r: 255, g: 0, b: 0 });
    });

    it('converts black', () => {
      expect(hexToRgb('#000000')).to.deep.equal({ r: 0, g: 0, b: 0 });
    });

    it('converts white', () => {
      expect(hexToRgb('#ffffff')).to.deep.equal({ r: 255, g: 255, b: 255 });
    });

    it('ignores surrounding whitespace', () => {
      expect(hexToRgb('  #00ff00  ')).to.deep.equal({ r: 0, g: 255, b: 0 });
    });
  });

  describe('invalid input', () => {
    it('throws on non-hex characters', () => {
      expect(() => hexToRgb('#gg0000')).to.throw('Invalid hex color');
    });

    it('throws on wrong length', () => {
      expect(() => hexToRgb('#ff57')).to.throw('Invalid hex color');
    });

    it('throws on an empty string', () => {
      expect(() => hexToRgb('')).to.throw('Invalid hex color');
    });

    it('throws a TypeError when input is a number', () => {
      expect(() => hexToRgb(123456)).to.throw(TypeError);
    });

    it('throws a TypeError when input is undefined', () => {
      expect(() => hexToRgb(undefined)).to.throw(TypeError);
    });
  });
});
