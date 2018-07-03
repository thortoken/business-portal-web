import React from 'react';
import { shallow } from 'enzyme';

import { GuestRoutes } from './GuestRoutes';

const initGuestRoutes = overrides => shallow(<GuestRoutes {...overrides} />);

describe('routes: <GuestRoutes/>', () => {
  it('should render without crashing', () => {
    const wrapper = initGuestRoutes();
    expect(wrapper).toBeTruthy();
  });
});
