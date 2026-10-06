import { describe, expect, it } from 'vitest';

import { deepClone, formatCurrency, normalizeBaseUrl } from './utilities';

describe('Shared Utilities', () => {
  describe('normalizeBaseUrl', () => {
    it('should strip single trailing slash', () => {
      expect(normalizeBaseUrl('https://api.example.com/')).toBe('https://api.example.com');
    });

    it('should strip multiple trailing slashes', () => {
      expect(normalizeBaseUrl('https://api.example.com///')).toBe('https://api.example.com');
    });

    it('should leave clean URLs untouched', () => {
      expect(normalizeBaseUrl('https://api.example.com/v1')).toBe('https://api.example.com/v1');
    });

    it('should handle empty strings', () => {
      expect(normalizeBaseUrl('')).toBe('');
    });
  });

  describe('deepClone', () => {
    it('should create an independent copy of an object', () => {
      const original = { a: 1, nested: { b: 2 } };
      const clone = deepClone(original);

      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
      expect(clone.nested).not.toBe(original.nested);
    });
  });

  describe('formatCurrency', () => {
    it('should format numbers into currency string', () => {
      expect(formatCurrency(1250)).toBe('$1,250.00');
    });
  });
});
