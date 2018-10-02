import React from 'react';
import { shallow } from 'enzyme';

import { InputGroup } from './InputGroup';

describe('component: <InputGroup/>', () => {
  describe('InputGroup', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<InputGroup />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render children properly', () => {
      const fakeChild = <div>fake child</div>;
      const wrapper = shallow(<InputGroup>{fakeChild}</InputGroup>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
