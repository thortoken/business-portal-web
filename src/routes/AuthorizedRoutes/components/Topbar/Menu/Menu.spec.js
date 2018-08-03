import React from 'react';
import { shallow, mount } from 'enzyme';

import { Menu, generateMenuItems } from './index';

const mockMenu = [
  { route: '/example1', label: 'First' },
  { route: '/example2', label: 'Second' },
  { route: '/example3', label: 'Third' },
];

const initMenu = overrides => {
  const mockProps = {
    pathname: '/welcome',
  };
  const wrapper = shallow(<Menu {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <Menu/>', () => {
  describe('renderManageAccount', () => {
    it('should render without crashes', () => {
      const { wrapper } = initMenu();
      expect(wrapper).toBeTruthy();
    });
  });

  describe('should highlight menu item', () => {
    it('should highlight selected items based on pathname', () => {
      const { wrapper } = initMenu();
      expect(wrapper.prop('selectedKeys')).toEqual(['/welcome']);
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({ pathname: '/payments' });
      expect(wrapper.prop('selectedKeys')).toEqual(['/payments']);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render menu', () => {
      const renderedMenu = generateMenuItems(mockMenu);
      expect(renderedMenu).toBeTruthy();
    });

    it('should have three navigation items', () => {
      const renderedMenu = generateMenuItems(mockMenu);
      expect(renderedMenu).toHaveLength(3);
    });

    it('should render correct', () => {
      const renderedMenu = generateMenuItems(mockMenu);
      expect(renderedMenu).toMatchSnapshot();
    });
  });
});
