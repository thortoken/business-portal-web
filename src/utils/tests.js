import React from 'react';
import { shallow } from 'enzyme';

export const renderChildrenAsText = wrapper =>
  shallow(<div>{wrapper.prop('children')}</div>).text();
