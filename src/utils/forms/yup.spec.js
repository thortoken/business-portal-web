import { dateTransformer } from './yup';

describe('utils: forms/yup', () => {
  describe('dateTransformer', () => {
    it('should return a function', () => {
      expect(dateTransformer('YYYY/DD/MM')).toBeInstanceOf(Function);
    });

    const FakeSchema = {
      isType: jest.fn(),
    };

    it('should return current value if it is already properly transformed', () => {
      FakeSchema.isType.mockReturnValueOnce(true);
      const transformer = dateTransformer('YYYY/DD/MM').bind(FakeSchema);
      const currentValue = 'current';
      const originalValue = 'original';
      const result = transformer(currentValue, originalValue);
      expect(result).toBe(currentValue);
    });

    it('should return original value as Date if it is valid', () => {
      FakeSchema.isType.mockReturnValueOnce(false);
      const transformer = dateTransformer('YYYY/DD/MM').bind(FakeSchema);
      const currentValue = '2010-01-01';
      const originalValue = '2010/01/01';
      const result = transformer(currentValue, originalValue);
      expect(result).toEqual(new Date('2010-01-01T00:00:00'));
    });

    it('should return current date as Date if original value is invalid', () => {
      FakeSchema.isType.mockReturnValueOnce(false);
      const transformer = dateTransformer('YYYY/DD/MM').bind(FakeSchema);
      const currentValue = '2010-71-01';
      const originalValue = '2010/01/71';
      const result = transformer(currentValue, originalValue);
      expect(result).toBeInstanceOf(Date);
    });
  });
});
