import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import Activity, { values } from './index';

values.now = moment('2018-09-25 12:00:00.000');

const initActivity = overrides => {
  const mockProps = {
    lastActivityDate: '2018-09-25 12:00:00.000',
  };

  const wrapper = shallow(<Activity {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <Activity/>', () => {
  describe('Activity', () => {
    it('should render without crashing', () => {
      const { wrapper } = initActivity();

      expect(wrapper).toBeTruthy();
    });
  });

  it('render Active state', () => {
    const { wrapper } = initActivity();

    expect(wrapper.find('.Activity--active').length).toBe(1);
    expect(wrapper.find('.Activity--active').text()).toBe('Active');
  });

  it('render Active state for ~ 7 days ago (+00:00:00:001)', () => {
    const { wrapper } = initActivity({ lastActivityDate: '2018-09-18 12:00:00.001' });

    expect(wrapper.find('.Activity--active').length).toBe(1);
    expect(wrapper.find('.Activity--active').text()).toBe('Active');
  });

  it('render Resting state for > 7 days ago (7d and 00:00:00.001) and < 31 days', () => {
    const { wrapper } = initActivity({ lastActivityDate: '2018-09-18 11:59:59.999' });

    expect(wrapper.find('.Activity--resting').length).toBe(1);
    expect(wrapper.find('.Activity--resting').text()).toBe('Resting');
  });

  it('render Resting state for > 7 days ago and < 31 days (30 days and 11:59:59:999)', () => {
    const { wrapper } = initActivity({ lastActivityDate: '2018-08-25 12:00:00.001' });

    expect(wrapper.find('.Activity--resting').length).toBe(1);
    expect(wrapper.find('.Activity--resting').text()).toBe('Resting');
  });

  it('render Inactive state for > 31 days ago', () => {
    const { wrapper } = initActivity({ lastActivityDate: '2018-08-25 11:59:59.999' });

    expect(wrapper.find('.Activity--inactive').length).toBe(1);
    expect(wrapper.find('.Activity--inactive').text()).toBe('Inactive');
  });
});
