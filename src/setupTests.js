import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(navigator, 'language', {
  get() {
    return 'en-US';
  },
});

window.URLSearchParams = class {
  parameters = {};
  constructor(query) {
    if (query) {
      const queryString = query.substr(0, 1) === '?' ? query.substr(1) : query;
      this.parameters = queryString.split('&').reduce((params, pair) => {
        const [key, value] = pair.split('=');
        // eslint-disable-next-line no-param-reassign
        params[key] = value;
        return params;
      }, this.parameters);
    }
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.parameters, key);
  }
  get(key) {
    return this.parameters[key];
  }
};
