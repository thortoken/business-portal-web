import React from 'react';
import { shallow } from 'enzyme';

import DividedSection from './index';

const initDividedSection = overrides => {
  const wrapper = shallow(<DividedSection {...overrides} />);
  return { wrapper };
};

describe('component: <DividedSection/>', () => {
  describe('DividedSection', () => {
    it('should render without crashing', () => {
      const { wrapper } = initDividedSection();
      expect(wrapper).toMatchSnapshot();
    });

    it('should render classname based on orientation', () => {
      const { wrapper } = initDividedSection({ orientation: 'vertical' });
      expect(wrapper.prop('className')).toContain('DividedSection--vertical');

      wrapper.setProps({ orientation: 'horizontal' });
      expect(wrapper.prop('className')).toContain('DividedSection--horizontal');
    });
  });
});
