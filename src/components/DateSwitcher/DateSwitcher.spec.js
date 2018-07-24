import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import DateSwitcher, { addToDate } from './index';

const initDateSwitcher = overrides => {
  const mockProps = {
    onChange: jest.fn(),
  };
  const wrapper = shallow(<DateSwitcher {...mockProps} {...overrides} />);

  return { mockProps, wrapper };
};

describe('component: <DateSwitcher />', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initDateSwitcher();
      expect(wrapper).toMatchSnapshot();
    });

    it('should properly format date based on interval', () => {
      const mockDate = moment('2018-08-01T00:00:00Z');
      const { wrapper } = initDateSwitcher({ interval: 'day', date: mockDate });
      expect(wrapper.find('.DateSwitcher-value').text()).toBe(
        mockDate.format(DateSwitcher.dateFormats['day'])
      );

      wrapper.setProps({ interval: 'month' });
      expect(wrapper.find('.DateSwitcher-value').text()).toBe(
        mockDate.format(DateSwitcher.dateFormats['month'])
      );

      wrapper.setProps({ interval: 'year' });
      expect(wrapper.find('.DateSwitcher-value').text()).toBe(
        mockDate.format(DateSwitcher.dateFormats['year'])
      );
    });
  });

  describe('methods', () => {
    describe('formatDate', () => {
      it('should format the date using predefined format for provided interval', () => {
        const mockDate = moment('2018-08-01T00:00:00Z');
        mockDate.format = jest.fn();
        const { wrapper } = initDateSwitcher({ date: mockDate });

        Object.entries(DateSwitcher.dateFormats).forEach(([key, value]) => {
          wrapper.setProps({ interval: key });
          wrapper.instance().formatDate();
          expect(mockDate.format).toHaveBeenLastCalledWith(value);
        });
      });
    });

    describe('handleChange', () => {
      it('should update the date in the state and call onChange event', () => {
        const { mockProps, wrapper } = initDateSwitcher();
        wrapper.instance().handleChange('fake date');
        expect(wrapper.state('date')).toBe('fake date');
        expect(mockProps.onChange).toHaveBeenCalledWith('fake date');
      });
    });

    describe('handleDateIncrease', () => {
      it('should increase the date by interval and call handleChange', () => {
        const mockDate = moment();
        const { wrapper } = initDateSwitcher({ date: mockDate });
        const instance = wrapper.instance();
        instance.addToDate = jest.fn(() => 'fake date');
        instance.handleChange = jest.fn();

        Object.keys(DateSwitcher.dateFormats).forEach(key => {
          wrapper.setProps({ interval: key });
          instance.handleDateIncrease();
          expect(instance.addToDate).toHaveBeenLastCalledWith(mockDate, key, 1);
          expect(instance.handleChange).toHaveBeenCalledWith('fake date');
        });
      });
    });

    describe('handleDateDecrease', () => {
      it('should increase the date by interval and call handleChange', () => {
        const mockDate = moment();
        const { wrapper } = initDateSwitcher({ date: mockDate });
        const instance = wrapper.instance();
        instance.addToDate = jest.fn(() => 'fake date');
        instance.handleChange = jest.fn();

        Object.keys(DateSwitcher.dateFormats).forEach(key => {
          wrapper.setProps({ interval: key });
          instance.handleDateDecrease();
          expect(instance.addToDate).toHaveBeenLastCalledWith(mockDate, key, -1);
          expect(instance.handleChange).toHaveBeenCalledWith('fake date');
        });
      });
    });
  });

  describe('addToDate', () => {
    let mockDate;
    const formatDate = date => date.utc().format();

    beforeEach(() => {
      mockDate = moment('2018-08-01T00:00:00Z');
    });

    it('should properly add and subtract days', () => {
      expect(formatDate(addToDate(mockDate, 'day', 2))).toBe('2018-08-03T00:00:00Z');
      expect(formatDate(addToDate(mockDate, 'day', -2))).toBe('2018-07-30T00:00:00Z');
    });

    it('should properly add and subtract months', () => {
      expect(formatDate(addToDate(mockDate, 'month', 2))).toBe('2018-10-01T00:00:00Z');
      expect(formatDate(addToDate(mockDate, 'month', -2))).toBe('2018-06-01T00:00:00Z');
    });

    it('should properly add and subtract years', () => {
      expect(formatDate(addToDate(mockDate, 'year', 2))).toBe('2020-08-01T00:00:00Z');
      expect(formatDate(addToDate(mockDate, 'year', -2))).toBe('2016-08-01T00:00:00Z');
    });
  });
});
