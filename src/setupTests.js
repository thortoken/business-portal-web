import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

Object.defineProperty(navigator, 'language', {
  get() {
    return 'en-US';
  },
});
