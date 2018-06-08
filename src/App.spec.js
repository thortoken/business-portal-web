import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';

const initApp = overrides => {
  const mockProps = {};
  const wrapper = shallow(<App {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('routes: <App />', () => {
  it('should render without errors', () => {
    const { wrapper } = initApp();
    expect(wrapper.length).toBe(1);
  });
});
