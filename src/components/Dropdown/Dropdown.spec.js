import React from 'react';
import { shallow } from 'enzyme';

import { Dropdown } from './index';

const fakeOptions = [{ key: 'v1', value: 'one' }, { key: 'v2', value: 'two' }];

const initDropdown = overrides => shallow(<Dropdown {...overrides} />);

describe('component: <Dropdown/>', () => {
  describe('render', () => {
    it('should render without crashes', () => {
      const wrapper = initDropdown();
      expect(wrapper).toBeTruthy();
    });

    it('should pass all other props to the dropdown', () => {
      const dropdownProps = { other1: 'value1', other2: 'value2' };
      const wrapper = initDropdown(dropdownProps);
      expect(wrapper.find('Dropdown').props()).toMatchObject(dropdownProps);
    });

    it('should append the provided className', () => {
      const dropdownProps = { className: 'Test-classname' };
      const wrapper = initDropdown(dropdownProps);
      expect(wrapper.prop('className')).toContain('Test-classname');
    });
  });

  describe('renderMenu', () => {
    it('should render without crashes', () => {
      const wrapper = initDropdown();
      const instance = wrapper.instance();

      const renderedMenu = instance.renderMenu();
      expect(renderedMenu).toBeTruthy();
    });

    it('should render options', () => {
      const wrapper = initDropdown({ options: fakeOptions });
      const instance = wrapper.instance();

      const renderedMenu = shallow(instance.renderMenu()).at(0);
      renderedMenu.forEach((node, index) => {
        const option = fakeOptions[index];
        expect(node.key()).toBe(option.key);
        expect(node.prop('children')).toBe(option.value);
      });
    });

    it('should render options passed as strings', () => {
      const fakeStringOptions = ['s1', 's2'];
      const wrapper = initDropdown({ options: fakeStringOptions });
      const instance = wrapper.instance();

      const renderedMenu = shallow(instance.renderMenu()).at(0);
      renderedMenu.forEach((node, index) => {
        const option = fakeStringOptions[index];
        expect(node.key()).toBe(option);
        expect(node.prop('children')).toBe(option);
      });
    });

    it('should call onClick on item selection', () => {
      const wrapper = initDropdown({ options: fakeOptions });
      const instance = wrapper.instance();
      instance.handleSelect = jest.fn();

      const MenuRenderer = instance.renderMenu;
      const menuWrapper = shallow(<MenuRenderer />);

      menuWrapper.simulate('click', fakeOptions[1]);

      expect(instance.handleSelect).toHaveBeenCalledWith(fakeOptions[1]);
    });
  });

  describe('handleSelect', () => {
    it("should call onClick with the selected item's key", () => {
      const mockOnClick = jest.fn();
      const wrapper = initDropdown({ onClick: mockOnClick });

      wrapper.instance().handleSelect(fakeOptions[1]);

      expect(mockOnClick).toHaveBeenCalledWith(fakeOptions[1].key);
    });
  });
});
