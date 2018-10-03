import React from 'react';
import { shallow } from 'enzyme';

import { Box } from './Box';

const initBox = overrides => {
  const mockProps = {};
  const wrapper = shallow(<Box {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <Box/>', () => {
  describe('Box', () => {
    it('should render without crashing', () => {
      const { wrapper } = initBox();
      expect(wrapper).toMatchSnapshot();
    });

    it('should render children properly', () => {
      const fakeChild = <div>fake child</div>;
      const { wrapper } = initBox({ childrens: fakeChild });
      expect(wrapper).toMatchSnapshot();
    });

    it('should allow setting custom className', () => {
      const { wrapper } = initBox({ className: 'fake1 fake2' });
      expect(wrapper.prop('className')).toContain('fake1 fake2');
    });

    it('should allow setting transparent background', () => {
      const { wrapper } = initBox({ transparent: true });
      expect(wrapper.prop('className')).toContain('Box--transparent');
    });

    it('should allow setting padding', () => {
      const { wrapper } = initBox({ padding: true });
      expect(wrapper.prop('className')).toContain('Box--padding');
    });
  });
});
