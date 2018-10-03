import React from 'react';
import { shallow } from 'enzyme';

import { DatePickerField } from './DatePickerField';

const initDatePicker = overrides => {
  const onChangeInner = jest.fn();
  const mockProps = {
    onChange: jest.fn(() => onChangeInner),
    onChangeInner,
    format: 'YYYY-MM-DD',
    name: 'testName',
    showToday: false,
  };
  const wrapper = shallow(<DatePickerField {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <DatePickerField/>', () => {
  it('should render without crashing', () => {
    const { wrapper } = initDatePicker();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange after handleChange', () => {
    const { wrapper, mockProps } = initDatePicker();
    wrapper.instance().handleChange(null, '2018-10-01');
    expect(mockProps.onChange).toHaveBeenCalledWith('testName');
    expect(mockProps.onChangeInner).toHaveBeenCalledWith('2018-10-01');
  });
});
