import React from 'react';
import { shallow } from 'enzyme';

import ContractorSummary from './index';

const initContractorSummary = overrides => {
  const mockProps = {
    rank: 1,
    nJobs: 10,
    prev: 1234.56,
    current: 987.65,
    ytd: 12345.67,
  };

  const wrapper = shallow(<ContractorSummary {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <ContractorSummary/>', () => {
  describe('ContractorSummary', () => {
    it('should render without crashing', () => {
      const { wrapper } = initContractorSummary();

      expect(wrapper).toBeTruthy();
    });
  });

  it('render ContractorSummary', () => {
    const { wrapper } = initContractorSummary();

    expect(wrapper).toMatchSnapshot();
  });
});
