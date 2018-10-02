import React from 'react';
import { shallow } from 'enzyme';

import { FormField } from './FormField';

const initFormField = overrides => {
  const mockProps = {
    name: 'testName',
  };
  const wrapper = shallow(<FormField {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <FormField/>', () => {
  it('should render without crashing', () => {
    const wrapper = initFormField();
    expect(wrapper).toMatchSnapshot();
  });
});
