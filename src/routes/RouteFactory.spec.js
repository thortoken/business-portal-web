import React from 'react';
import { shallow } from 'enzyme';

import { RouteFactory } from './RouteFactory';
import GuestRoutes from './GuestRoutes';
import AuthorizedRoutes from './AuthorizedRoutes';

const initRouteFactory = overrides => shallow(<RouteFactory {...overrides} />);

describe('routes: RouteFactory', () => {
  it('should render guest routes for unauthorized users', () => {
    const wrapper = initRouteFactory({ isLoggedIn: false });
    expect(wrapper.is(GuestRoutes)).toBe(true);
  });

  it('should render authorized routes for authorized users', () => {
    const wrapper = initRouteFactory({ isLoggedIn: true });
    expect(wrapper.is(AuthorizedRoutes)).toBe(true);
  });
});
