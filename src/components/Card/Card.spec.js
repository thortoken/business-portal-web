import React from 'react';
import { shallow } from 'enzyme';

import { Card } from './Card';

const initCard = overrides => {
  return shallow(<Card color="blue" {...overrides} />);
};

describe('component: <Card/>', () => {
  it('should render without crashing', () => {
    const wrapper = initCard();
    expect(wrapper).toBeTruthy();
  });

  it('should render children properly', () => {
    const fakeChild = <div>fake child</div>;
    const wrapper = initCard({ children: fakeChild });
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow setting different colors', () => {
    const allowedColors = ['black', 'blue', 'green'];
    allowedColors.forEach(color => {
      const wrapper = initCard({ color });
      expect(wrapper.prop('className')).toContain(`Card--${color}`);
    });
  });

  it('should render title, description and icon properly', () => {
    const wrapper = initCard({
      description: 'fake description',
      icon: <div>fake icon</div>,
      title: 'fake title',
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('container', () => {
    it('should use div element by default', () => {
      const wrapper = initCard({ rounded: false });
      expect(wrapper.is('div')).toBe(true);
    });

    it('should use Box component for rounded corners', () => {
      const wrapper = initCard({ rounded: true });
      expect(wrapper.is('Box')).toBe(true);
    });
  });
});
