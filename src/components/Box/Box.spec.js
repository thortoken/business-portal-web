import React from 'react';
import { shallow } from 'enzyme';

import Box from './index';

describe('component: <Box/>', () => {
  describe('Box', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<Box />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render children properly', () => {
      const fakeChild = <div>fake child</div>;
      const wrapper = shallow(<Box>{fakeChild}</Box>);
      expect(wrapper).toMatchSnapshot();
    });

    it('should allow setting custom className', () => {
      const wrapper = shallow(<Box className="fake1 fake2" />);
      expect(wrapper.prop('className')).toContain('fake1 fake2');
    });

    it('should allow setting transparent background', () => {
      const wrapper = shallow(<Box transparent />);
      expect(wrapper.prop('className')).toContain('Box--transparent');
    });

    it('should allow setting padding', () => {
      const wrapper = shallow(<Box padding />);
      expect(wrapper.prop('className')).toContain('Box--padding');
    });
  });
});
