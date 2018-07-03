import React from 'react';
import { shallow } from 'enzyme';

import { AuthorizedRoutes } from './index';

const initAuthorizedRoutes = overrides => shallow(<AuthorizedRoutes {...overrides} />);

describe('routes: <AuthorizedRoutes/>', () => {
  it('should render without crashing', () => {
    const wrapper = initAuthorizedRoutes();
    expect(wrapper).toBeTruthy();
  });
});
