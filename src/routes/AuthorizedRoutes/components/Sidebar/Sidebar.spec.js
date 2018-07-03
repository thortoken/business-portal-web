import React from 'react';
import { shallow } from 'enzyme';

import { Sidebar } from './index';

const initSidebar = overrides => {
  const mockProps = {
    logout: jest.fn(),
  };
  const wrapper = shallow(<Sidebar {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('routes: <Sidebar/>', () => {
  it('should render without crashing', () => {
    const { wrapper } = initSidebar();
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleLogout', () => {
    it('should call the logout function from props', () => {
      const { mockProps, wrapper } = initSidebar();

      wrapper.instance().handleLogout();

      expect(mockProps.logout).toHaveBeenCalled();
    });
  });

  describe('hovering with mouse', () => {
    it('should change collapsed state on mouse over/out', () => {
      const { wrapper } = initSidebar();
      expect(wrapper.state('collapsed')).toBe(true);

      wrapper.instance().handleMouseOver();
      expect(wrapper.state('collapsed')).toBe(false);

      wrapper.instance().handleMouseOut();
      expect(wrapper.state('collapsed')).toBe(true);
    });
  });

  describe('selected menu item', () => {
    it('should select the active menu item based on current route', () => {
      const { wrapper } = initSidebar({ pathname: '/contractors' });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
