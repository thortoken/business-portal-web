import React from 'react';
import { shallow } from 'enzyme';

import { BottomBar } from './BottomBar';

const initBottomBar = overrides => {
  const mockProps = {
    onSubmit: jest.fn(),
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
  };

  const wrapper = shallow(<BottomBar {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('page: BottomBar', () => {
  it('should render without crashing', () => {
    const { wrapper } = initBottomBar();
    expect(wrapper).toBeTruthy();
  });

  describe('should display right extrension for single or multiple contractors', () => {
    it('single contractor', () => {
      const { wrapper } = initBottomBar({ selectedContractorsIds: new Set(['singleTestId']) });
      expect(wrapper.find('div.BottomBar-contractors-count').text()).toBe('1 Contractor');
    });

    it('multiple contractors', () => {
      const { wrapper } = initBottomBar({
        selectedContractorsIds: new Set(['firstTestId', 'secondTestId']),
      });
      expect(wrapper.find('div.BottomBar-contractors-count').text()).toBe('2 Contractors');
    });
  });

  describe('display bottomBar', () => {
    it('hide bottomBar for empty list', () => {
      const { wrapper } = initBottomBar({
        selectedContractorsIds: new Set([]),
      });
      expect(wrapper.find('div.BottomBar-hidden').length).toBe(1);
    });

    it('show bottomBar if any contractor is selected', () => {
      const { wrapper } = initBottomBar({
        selectedContractorsIds: new Set(['firstTestId', 'secondTestId']),
      });
      expect(wrapper.find('div.BottomBar-hidden').length).toBe(0);
    });
  });
});
