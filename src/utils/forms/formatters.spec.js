import { phone } from './formatters';

describe('utils: forms/formatters', () => {
  describe('phone', () => {
    it('should return value if it is empty', () => {
      expect(phone('')).toBe('');
      expect(phone(null)).toBe(null);
      expect(phone(undefined)).toBe(undefined);
    });

    it('should format phone number using "000 000-0000" mask', () => {
      expect(phone('1234567890')).toBe('123 456-7890');
      expect(phone('123456789')).toBe('123 456-789');
      expect(phone('12345678')).toBe('123 456-78');
      expect(phone('1234567')).toBe('123 456-7');
      expect(phone('123456')).toBe('123 456');
      expect(phone('12345')).toBe('123 45');
      expect(phone('1234')).toBe('123 4');
      expect(phone('123')).toBe('123');
      expect(phone('12')).toBe('12');
      expect(phone('1')).toBe('1');
    });
  });
});
