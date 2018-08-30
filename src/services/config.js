export class Config {
  constructor() {
    this.apiUrl = 'http://35.230.69.244/';
    this.tenantId = this.getTenantIdFromUrl() || '7bc0447a-ea99-4ba2-93bb-c84f5b325c50';
  }

  getTenantIdFromUrl(location = window.location) {
    const matches = (location.query || location.search).match(/tenantId=([^&]+)/);
    return matches && matches[1];
  }
}

export default new Config();
