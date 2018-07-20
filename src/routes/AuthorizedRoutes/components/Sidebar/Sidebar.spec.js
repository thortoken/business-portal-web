import React from 'react';
import { shallow } from 'enzyme';

import { Sidebar, getSelectedKeyFromPath } from './index';

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

  describe('getSelectedKeyFromPath', () => {
    it('should return the first part of the path, with a leading slash', () => {
      expect(getSelectedKeyFromPath('/some/path/to/page')).toBe('/some');
      expect(getSelectedKeyFromPath('/some/')).toBe('/some');
      expect(getSelectedKeyFromPath('/some')).toBe('/some');
      expect(getSelectedKeyFromPath('/')).toBe('/');
    });

    it('should return an empty string on invalid routes', () => {
      expect(getSelectedKeyFromPath('some/path')).toBe('');
      expect(getSelectedKeyFromPath('')).toBe('');
      expect(getSelectedKeyFromPath(null)).toBe('');
      expect(getSelectedKeyFromPath(undefined)).toBe('');
    });
  });
});
