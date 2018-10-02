import React from 'react';
import { shallow } from 'enzyme';

import { RefreshButton } from './RefreshButton';

const initRefreshButton = overrides => {
  const mockProps = {
    handleRefresh: jest.fn(),
  };
  const wrapper = shallow(<RefreshButton {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <RefreshButton/>', () => {
  describe('RefreshButton', () => {
    it('should render without crashing', () => {
      const { wrapper } = initRefreshButton();
      expect(wrapper).toMatchSnapshot();
    });
    it('should find button', () => {
      const { wrapper } = initRefreshButton();
      expect(wrapper.find('Button')).toBeTruthy();
    });
    it('should find button', () => {
      const { wrapper, mockProps } = initRefreshButton();
      wrapper.find('Button').simulate('click');
      expect(mockProps.handleRefresh).toHaveBeenCalled();
    });
  });
});
