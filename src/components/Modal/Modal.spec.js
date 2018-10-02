import React from 'react';
import { shallow } from 'enzyme';

import { Modal } from './Modal';

const initModal = overrides => {
  const mockProps = {
    onClose: jest.fn(),
  };
  const wrapper = shallow(<Modal {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('component: <RefreshButton/>', () => {
  describe('RefreshButton', () => {
    it('should render without crashing', () => {
      const { wrapper } = initModal();
      expect(wrapper).toMatchSnapshot();
    });
    it('should find button', () => {
      const { wrapper } = initModal();
      expect(wrapper.find('Button.Modal__header--close-button')).toBeTruthy();
    });
    it('should check if onClose function works', () => {
      const { wrapper, mockProps } = initModal();
      wrapper.find('Button.Modal__header--close-button').simulate('click');
      expect(mockProps.onClose).toHaveBeenCalled();
    });
  });
});
