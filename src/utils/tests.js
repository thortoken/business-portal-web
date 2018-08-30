import React from 'react';
import { shallow } from 'enzyme';

export const renderChildrenAsText = wrapper =>
  shallow(<div>{wrapper.prop('children')}</div>).text();

export const setUrl = newUrl => {
  const url = new URL(newUrl);
  ['href', 'protocol', 'host', 'hostname', 'origin', 'port', 'pathname', 'search', 'hash'].forEach(
    prop => {
      Object.defineProperty(global.window.location, prop, {
        value: url[prop],
        writable: true,
      });
    }
  );
};
