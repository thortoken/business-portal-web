import React from 'react';
import { shallow } from 'enzyme';

import Progress from './Progress';

describe('component: <Progress/>', () => {
  describe('Progress', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<Progress />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should pass all the other props to the Ant Progress component', () => {
      const wrapper = shallow(<Progress percent={20} status="exception" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the percent text in the middle', () => {
      const wrapper = shallow(<Progress percent={20} status="exception" />);
      expect(wrapper.find('.Progress-text').prop('style')).toEqual({ left: '10%' });
    });
  });
});
