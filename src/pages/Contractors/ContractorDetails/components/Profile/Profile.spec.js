import React from 'react';
import { shallow } from 'enzyme';

import Profile from './index';

const initProfile = overrides => {
  const mockProps = {
    handleRefresh: jest.fn(),
    openAddFundingSourceModal: jest.fn(),
    isLoading: false,
    firstName: 'John',
    lastName: 'Doe',
    updatedAt: '',
    createdAt: '',
    address1: 'Address1',
    address2: 'Address2',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '74234',
    phone: '5551234567',
    children: '',
    accountNumber: '123123123',
    accountRouting: '345345345',
  };

  const wrapper = shallow(<Profile {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <Profile/>', () => {
  describe('Profile', () => {
    it('should render without crashing', () => {
      const { wrapper } = initProfile();

      expect(wrapper).toBeTruthy();
    });
  });

  it('render Popover if any warnings', () => {
    const { wrapper } = initProfile();

    expect(wrapper).toMatchSnapshot();
  });
});
