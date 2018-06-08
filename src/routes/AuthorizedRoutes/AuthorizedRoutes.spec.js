import React from 'react';
import { shallow } from 'enzyme';

import { AuthorizedRoutes } from './index';

const initAuthorizedRoutes = overrides => {
  const mockProps = {};
  const wrapper = shallow(<AuthorizedRoutes {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('routes: <AuthorizedRoutes />', () => {
  it('should render without errors', () => {
    const { wrapper } = initAuthorizedRoutes();
    expect(wrapper.length).toBe(1);
  });
});
