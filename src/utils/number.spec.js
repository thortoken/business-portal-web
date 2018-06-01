import * as number from './number';

describe('utils: number', () => {
  const value = 1234567.8901;

  describe('formatCurrency', () => {
    const toLocaleStringSpy = jest.spyOn(Number.prototype, 'toLocaleString');

    beforeEach(() => {
      toLocaleStringSpy.mockClear();
    });

    it('should return localized number with default: locale=en-US, currency=null, precision=2', () => {
      expect(number.formatCurrency(value)).toEqual('1,234,567.89');
      expect(toLocaleStringSpy).toHaveBeenCalledWith('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });
    it('should allow setting precision', () => {
      expect(number.formatCurrency(value, { precision: 0 })).toEqual('1,234,568');
      expect(number.formatCurrency(value, { precision: 1 })).toEqual('1,234,567.9');
      expect(number.formatCurrency(value, { precision: 2 })).toEqual('1,234,567.89');
      expect(number.formatCurrency(value, { precision: 3 })).toEqual('1,234,567.890');

      expect(toLocaleStringSpy).toHaveBeenLastCalledWith('en-US', {
        style: 'decimal',
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    });
    it('should allow setting a currency', () => {
      expect(number.formatCurrency(value, { currency: 'USD' })).toEqual('$1,234,567.89');
      expect(toLocaleStringSpy).toHaveBeenCalledWith('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });
    it('should allow setting a locale', () => {
      expect(number.formatCurrency(value, { currency: 'USD', locale: 'en-US' })).toEqual(
        '$1,234,567.89'
      );
      expect(number.formatCurrency(value, { currency: 'USD', locale: 'pl-PL' })).toEqual(
        'US$ 1,234,567.89'
      );
      expect(number.formatCurrency(value, { currency: 'PLN', locale: 'en-US' })).toEqual(
        'PLN1,234,567.89'
      );
      expect(number.formatCurrency(value, { currency: 'PLN', locale: 'pl-PL' })).toEqual(
        'PLN 1,234,567.89'
      );

      expect(toLocaleStringSpy).toHaveBeenLastCalledWith('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });
  });

  describe('formatUsd', () => {
    it('should format with currency=USD and precision=2', () => {
      expect(number.formatUsd(value)).toEqual('$1,234,567.89');
    });
  });

  describe('formatThor', () => {
    it('should call round down, and format with currency=THOR and precision=0', () => {
      expect(number.formatThor(value)).toEqual('1,234,567 THOR');
    });
  });
});
