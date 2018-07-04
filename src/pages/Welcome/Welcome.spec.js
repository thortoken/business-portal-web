import React from 'react';
import { shallow } from 'enzyme';

import { Welcome } from './index';

const initWelcome = overrides => {
  const wrapper = shallow(<Welcome {...overrides} />);
  return { wrapper };
};

const getStepContent = wrapper =>
  wrapper
    .find('div')
    .children()
    .last();

describe('page: <Welcome/>', () => {
  it('should render without crashing', () => {
    const { wrapper } = initWelcome();
    expect(wrapper).toBeTruthy();
  });

  it('should update currentStep', () => {
    const { wrapper } = initWelcome();
    expect(getStepContent(wrapper).is('AddTeamStep')).toBe(true);
    expect(wrapper.find('Steps').prop('currentStep')).toBe(0);

    wrapper.setState({ currentStep: 1 });
    expect(getStepContent(wrapper).is('ConnectBankStep')).toBe(true);
    expect(wrapper.find('Steps').prop('currentStep')).toBe(1);
  });
});
