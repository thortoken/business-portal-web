import React from 'react';
import { shallow } from 'enzyme';

import { Login } from './Login';

jest.mock('./formSchema', () => ({
  initialValues: 'fake initial values',
  validationSchema: { cast: jest.fn(x => x) },
  formFields: {
    email: { label: 'Email' },
    password: { label: 'Password' },
  },
}));

const initLogin = overrides => {
  const mockProps = {
    login: jest.fn(),
  };
  const wrapper = shallow(<Login {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('page: Login', () => {
  it('should render without crashing', () => {
    const { wrapper } = initLogin();

    expect(wrapper).toBeTruthy();
  });

  describe('renderForm', () => {
    const { wrapper } = initLogin();
    const instance = wrapper.instance();

    it('should render without crashing', () => {
      const mockFormProps = {
        handleSubmit: jest.fn(),
        isSubmitting: false,
        values: { email: '', password: '' },
        dirty: false,
      };
      const renderedForm = shallow(instance.renderForm(mockFormProps));

      expect(renderedForm).toMatchSnapshot();
    });

    it('should disable submit button if form is not dirty or is submitting', () => {
      const mockFormProps = {
        handleSubmit: jest.fn(),
        isSubmitting: false,
        values: { email: '', password: '' },
        dirty: true,
      };

      let renderedForm = shallow(instance.renderForm(mockFormProps));
      expect(renderedForm.find('Button').prop('disabled')).toBe(false);

      renderedForm = shallow(instance.renderForm({ ...mockFormProps, dirty: false }));
      expect(renderedForm.find('Button').prop('disabled')).toBe(true);

      renderedForm = shallow(instance.renderForm({ ...mockFormProps, isSubmitting: true }));
      expect(renderedForm.find('Button').prop('disabled')).toBe(true);
    });
  });

  describe('login submit action', () => {
    it('should submit form with proper data', async () => {
      const { wrapper } = initLogin();
      const instance = wrapper.instance();
      instance.checkLogin = jest.fn();

      const fakeLoginData = {
        email: 'test@test.com',
        password: '123',
      };

      await instance.handleSubmit(fakeLoginData);

      expect(instance.checkLogin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: '123',
      });
    });
  });
});
