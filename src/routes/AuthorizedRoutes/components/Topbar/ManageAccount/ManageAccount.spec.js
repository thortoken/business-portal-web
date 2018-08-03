import React from 'react';
import { shallow } from 'enzyme';

import { ManageAccount, generateMenuItems } from './index';

const fakeOptions = [
  { key: 'v1', icon: 'plus', label: 'one', className: 'asd' },
  { key: '', icon: 'user', label: 'two', className: 'qwe', action: jest.fn() },
];

const fakeOptionsWithoutKeyAndAction = [
  { icon: 'plus', label: 'one', className: 'asd' },
  { icon: 'user', label: 'two', className: null, action: jest.fn() },
];

const initManageAccount = overrides => {
  const mockProps = {
    logout: jest.fn(),
  };
  const wrapper = shallow(<ManageAccount {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <ManageAccount/>', () => {
  describe('renderManageAccount', () => {
    it('should render without crashes', () => {
      const { wrapper } = initManageAccount();
      expect(wrapper).toBeTruthy();
    });
  });

  describe('Menu items generator', () => {
    it('should render without crashes', () => {
      const renderedMenu = generateMenuItems(fakeOptions);
      expect(renderedMenu).toBeTruthy();
    });

    it('should be list of null if there is no action and key', () => {
      const renderedMenu = generateMenuItems(fakeOptionsWithoutKeyAndAction);
      expect(renderedMenu[0]).toBeNull();
    });

    it('handle logout action', () => {
      const { mockProps, wrapper } = initManageAccount();
      const instance = wrapper.instance();

      instance.handleLogout();
      expect(mockProps.logout).toBeCalled();
    });

    it('render dropdown', () => {
      const { wrapper } = initManageAccount();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
