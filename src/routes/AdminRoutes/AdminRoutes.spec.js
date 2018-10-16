import React from 'react';
import { shallow } from 'enzyme';

import { AdminRoutes } from './index';

const initAdminRoutes = overrides => shallow(<AdminRoutes {...overrides} />);

describe('routes: <AdminRoutes/>', () => {
  it('should render without crashing', () => {
    const wrapper = initAdminRoutes();
    expect(wrapper).toBeTruthy();
  });
});
