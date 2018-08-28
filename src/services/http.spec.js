import Http, { setAuthHeader, removeAuthHeader } from './http';

jest.mock('./config', () => ({
  apiUrl: 'fake api url',
}));

describe('service: Http', () => {
  describe('configuration', () => {
    it('should allow using REST methods', () => {
      expect(Object.keys(Http)).toEqual(
        expect.arrayContaining(['get', 'post', 'patch', 'put', 'options', 'delete'])
      );
    });

    it('should use base API url from Config service', () => {
      expect(Http.defaults.baseURL).toBe('fake api url');
    });

    describe('interceptors', () => {
      describe('response', () => {
        const responseHandlers = Http.interceptors.response.handlers;
        it('should return the reponse on success', () => {
          expect(responseHandlers[0].fulfilled('fake response')).toBe('fake response');
        });

        it('should reject the promise of response on error', async () => {
          try {
            await responseHandlers[0].rejected(new Error('fake error'));
          } catch (err) {
            expect(err.message).toBe('fake error');
          }
        });
      });
    });
  });

  describe('helpers', () => {
    describe('setAuthHeader', () => {
      beforeEach(() => {
        Http.defaults.headers = {};
      });

      it('should set the Authorization header', () => {
        setAuthHeader('fake-token');

        expect(Http.defaults.headers.Authorization).toBe('Bearer fake-token');
      });
    });

    describe('removeAuthHeader', () => {
      beforeEach(() => {
        Http.defaults.headers = {};
      });

      it('should set the Authorization header', () => {
        Http.defaults.headers.Authorization = 'fake-token';

        removeAuthHeader();
        expect(Http.defaults.headers.Authorization).toBe(undefined);
      });
    });
  });
});
