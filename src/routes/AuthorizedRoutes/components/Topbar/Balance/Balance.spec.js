import React from 'react';
import { shallow } from 'enzyme';

import { Balance } from './index';

const initBalance = overrides => {
  const mockProps = {
    balanceValue: 0,
    paymentDaysLeft: 0,
    isAutoRenewOn: true,
    onChange: jest.fn(),
  };
  const wrapper = shallow(<Balance {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <Balance/>', () => {
  describe('renderBalance', () => {
    it('should render without crashes', () => {
      const { wrapper } = initBalance();
      expect(wrapper).toBeTruthy();
    });

    it('should render as expected', () => {
      const { wrapper } = initBalance({
        balanceValue: 5000,
        paymentDaysLeft: 5,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should display autorenew ON or OFF depend flag isAutoRenewOn', () => {
      const { wrapper } = initBalance();

      wrapper.setProps({ isAutoRenewOn: true });
      expect(wrapper.find('.Balance-approximately-switch-label').text()).toBe('Auto Renew ON');

      wrapper.setProps({ isAutoRenewOn: false });
      expect(wrapper.find('.Balance-approximately-switch-label').text()).toBe('Auto Renew OFF');
    });
  });
});
