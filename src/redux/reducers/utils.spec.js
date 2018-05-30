import * as utils from './utils';

describe('redux: reducer utils', () => {
  describe('convertDateFields', () => {
    it('should return the input of no fields are specified', () => {
      const firebaseObject = { prop1: 'value', prop2: 'value' };
      const fieldNames = [];

      const result = utils.convertDateFields(firebaseObject, fieldNames);

      expect(result).toEqual(firebaseObject);
    });

    it('should skip non-existing fields', () => {
      const firebaseObject = { prop1: 'value', prop2: 'value' };
      const fieldNames = ['non-existing1', 'non-existing2'];

      const result = utils.convertDateFields(firebaseObject, fieldNames);

      expect(result).toEqual(firebaseObject);
    });

    it('should skip fields that are not valid Firebase Timestamps', () => {
      class InvalidTimestamp {
        invalidMethod() {
          return '2000-01-01T11:22:33Z';
        }
      }
      const firebaseObject = { prop1: new InvalidTimestamp(), prop2: 'value' };
      const fieldNames = ['prop1'];

      const result = utils.convertDateFields(firebaseObject, fieldNames);

      expect(result).toEqual(firebaseObject);
    });

    it('should convert valid Firebase Timestamps', () => {
      const expectedDate = new Date('2000-01-01T11:22:33Z');
      class ValidTimestamp {
        toDate() {
          return expectedDate;
        }
      }
      const firebaseObject = { prop1: new ValidTimestamp(), prop2: 'value' };
      const fieldNames = ['prop1'];

      const result = utils.convertDateFields(firebaseObject, fieldNames);

      expect(result).toMatchObject({
        prop1: expectedDate,
        prop2: 'value',
      });
    });
  });
});
