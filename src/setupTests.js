import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(navigator, 'language', {
  get() {
    return 'en-US';
  },
});
