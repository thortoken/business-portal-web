import Config from './config';

describe('service: Config', () => {
  it('should contain all required keys', () => {
    expect(Object.keys(Config)).toEqual(['apiUrl', 'tenantId']);
  });
});
