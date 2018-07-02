import React from 'react';
import { shallow } from 'enzyme';

import { Header } from './index';

const initHeader = overrides => shallow(<Header {...overrides} />);

describe('component: <Header/>', () => {
  it('should render without crashing', () => {
    const wrapper = initHeader();
    expect(wrapper).toBeTruthy();
  });

  it('should render proper header for different sizes', () => {
    const allowedSizes = Object.entries(Header.headerSizes);
    allowedSizes.forEach(([size, componentName]) => {
      const wrapper = initHeader({ size });
      expect(wrapper.find(`${componentName}.Header-title`).length).toBe(1);
    });
  });

  it('should render children next to the header', () => {
    const fakeChild = <div>fake child</div>;
    const wrapper = initHeader({ children: fakeChild });
    expect(wrapper).toMatchSnapshot();
  });
});
