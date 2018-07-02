import React from 'react';
import { shallow } from 'enzyme';

import Actions from './index';

describe('component: <Actions/>', () => {
  describe('Actions', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<Actions position="top" />);
      expect(wrapper).toBeTruthy();
    });

    it('should render children properly', () => {
      const fakeChild = <div>fake child</div>;
      const wrapper = shallow(<Actions position="top">{fakeChild}</Actions>);
      expect(wrapper).toMatchSnapshot();
    });

    it('should use proper positioning', () => {
      let wrapper = shallow(<Actions position="top" />);
      expect(wrapper.prop('className')).toContain('Actions--top');

      wrapper = shallow(<Actions position="bottom" />);
      expect(wrapper.prop('className')).toContain('Actions--bottom');
    });
  });

  describe('Actions.Left', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<Actions.Left />);
      expect(wrapper).toBeTruthy();
    });

    it('should render children properly', () => {
      const fakeChild = <div>fake child</div>;
      const wrapper = shallow(<Actions.Left>{fakeChild}</Actions.Left>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Actions.Right', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<Actions.Right />);
      expect(wrapper).toBeTruthy();
    });

    it('should render children properly', () => {
      const fakeChild = <div>fake child</div>;
      const wrapper = shallow(<Actions.Right>{fakeChild}</Actions.Right>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
