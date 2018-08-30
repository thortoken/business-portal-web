import { setUrl } from '~utils/tests';

import { Config } from './config';

describe('service: Config', () => {
  describe('constructor', () => {
    it('should contain all required keys', () => {
      const config = new Config();
      expect(Object.keys(config)).toEqual(['apiUrl', 'tenantId']);
    });

    describe('getting tenantId', () => {
      let tenantGetterSpy;

      beforeEach(() => {
        tenantGetterSpy = jest.spyOn(Config.prototype, 'getTenantIdFromUrl');
      });

      afterEach(() => {
        tenantGetterSpy.mockRestore();
      });

      it('should try to get tenantId from the url', () => {
        tenantGetterSpy.mockImplementation(() => 'fake tenant id');

        const config = new Config();
        expect(tenantGetterSpy).toHaveBeenCalled();
        expect(config.tenantId).toBe('fake tenant id');
      });

      it('should fallback to a default tenantId', () => {
        tenantGetterSpy.mockImplementation(() => null);

        const config = new Config();
        expect(tenantGetterSpy).toHaveBeenCalled();
        expect(config.tenantId).toEqual(expect.any(String));
      });
    });
  });

  describe('getTenantIdFromUrl', () => {
    const config = new Config();

    it('should get tenantId query param from current location', () => {
      setUrl('http://example.com/?tenantId=123&some=param');
      expect(config.getTenantIdFromUrl()).toBe('123');
    });

    it('should return null if tenantId is not present in query params', () => {
      setUrl('http://example.com');
      expect(config.getTenantIdFromUrl()).toBe(null);

      setUrl('http://example.com/?other=param&another=one');
      expect(config.getTenantIdFromUrl()).toBe(null);
    });
  });
});
