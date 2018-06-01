import * as string from './string';

describe('utils: string', () => {
  describe('upperCaseFirst', () => {
    it('should uppercase the first character and lowercase the rest', () => {
      expect(string.upperCaseFirst('something')).toEqual('Something');
      expect(string.upperCaseFirst('SoMeThInG')).toEqual('Something');
      expect(string.upperCaseFirst('something else')).toEqual('Something else');
      expect(string.upperCaseFirst('sOmEtHiNg eLsE')).toEqual('Something else');
    });
  });

  describe('toTitleCase', () => {
    it('should uppercase the first character of each word, and lowercase the rest', () => {
      expect(string.toTitleCase('something')).toEqual('Something');
      expect(string.toTitleCase('SoMeThInG')).toEqual('Something');
      expect(string.toTitleCase('something else')).toEqual('Something Else');
      expect(string.toTitleCase('sOmEtHiNg eLsE')).toEqual('Something Else');
    });
  });
});
