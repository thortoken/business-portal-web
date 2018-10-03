import React from 'react';
import { shallow } from 'enzyme';

import { BackBtn } from './BackBtn';

const initComponent = overrides => {
  const wrapper = shallow(<BackBtn {...overrides} />);
  return { wrapper };
};

describe('component: <BackBtn/>', () => {
  it('should render without errors', () => {
    const { wrapper } = initComponent();
    expect(wrapper).toBeTruthy();
  });
});
