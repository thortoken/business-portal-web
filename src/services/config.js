export class Config {
  constructor() {
    this.apiUrl = 'https://odin-api.prod.gothor.com/';
    this.savedRoot = '';
    this.env = 'prod';
  }

  getTenantIdFromUrl(location = window.location) {
    const matches = (location.query || location.search).match(/tenantId=([^&]+)/);
    return matches && matches[1];
  }
}

export default new Config();
