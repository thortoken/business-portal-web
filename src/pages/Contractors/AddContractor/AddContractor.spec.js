import React from 'react';
import { shallow } from 'enzyme';

import { renderChildrenAsText } from '~utils/tests';

import { AddContractor } from './index';

jest.mock('./formSchema', () => ({
  initialValues: 'fake initial values',
  validationSchema: 'fake validation schema',
  formFields: {
    field1: { label: 'Field 1', input: { placeholder: 'xxx' } },
    field2: { label: 'Field 2' },
  },
  transformDateToMoment: jest.fn(() => ({
    format: jest.fn(() => 'fake moment date'),
  })),
}));

const initAddContractor = overrides => {
  const mockProps = {
    createUser: jest.fn(),
    createFundingSource: jest.fn(),
  };

  const wrapper = shallow(<AddContractor {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('page: AddContractor', () => {
  it('should render without crashing', () => {
    const { wrapper } = initAddContractor();

    expect(wrapper).toBeTruthy();
  });

  describe('renderForm', () => {
    const { wrapper } = initAddContractor();
    const instance = wrapper.instance();

    it('should render without crashing', () => {
      const mockFormProps = {
        handleSubmit: jest.fn(),
        isSubmitting: false,
        values: { field1: 'v1', field2: '' },
        dirty: false,
      };
      const renderedForm = shallow(instance.renderForm(mockFormProps));

      expect(renderedForm).toMatchSnapshot();
    });

    it('should render first name on the submit button', () => {
      const mockFormProps = {
        handleSubmit: jest.fn(),
        isSubmitting: false,
        values: { firstName: 'John' },
        dirty: false,
      };
      const renderedForm = shallow(instance.renderForm(mockFormProps));

      expect(renderChildrenAsText(renderedForm.find('Button'))).toEqual('Add John');
    });

    it('should disable submit button if form is not dirty or is submitting', () => {
      const mockFormProps = {
        handleSubmit: jest.fn(),
        isSubmitting: false,
        values: { field1: 'v1', field2: '' },
        dirty: true,
      };

      let renderedForm = shallow(instance.renderForm(mockFormProps));
      expect(renderedForm.find('Button[disabled]').prop('disabled')).toBe(false);

      renderedForm = shallow(instance.renderForm({ ...mockFormProps, dirty: false }));
      expect(renderedForm.find('Button').prop('disabled')).toBe(true);

      renderedForm = shallow(instance.renderForm({ ...mockFormProps, isSubmitting: true }));
      expect(renderedForm.find('Button').prop('disabled')).toBe(true);
    });
  });

  describe('actions', () => {
    describe('createContractor', () => {
      const { mockProps, wrapper } = initAddContractor();
      const instance = wrapper.instance();
      const fakeProfile = { firstName: 'John', lastName: 'Doe', dateOfBirth: '01/28/18' };

      beforeEach(() => {
        mockProps.createUser.mockClear();
      });

      it('should not create a new contractor if it was already created', async () => {
        instance.setState({ createdContractor: { firstName: 'Sam', lastName: 'Ting' } });

        await instance.createContractor(fakeProfile);

        expect(mockProps.createUser).not.toHaveBeenCalled();
      });

      it('should create a new contractor if it was not created yet', async () => {
        mockProps.createUser.mockReturnValueOnce('fake created contractor');
        instance.setState({ createdContractor: null });

        await instance.createContractor(fakeProfile);

        expect(mockProps.createUser).toHaveBeenCalledWith({
          tenantProfile: {
            ...fakeProfile,
            dateOfBirth: 'fake moment date',
          },
        });
        expect(instance.state.createdContractor).toBe('fake created contractor');
      });
    });

    describe('createFundingSource', () => {
      const { mockProps, wrapper } = initAddContractor();
      const instance = wrapper.instance();
      const fakeBankInfo = { accountNumber: 12345, routingNumber: 987654321 };

      beforeEach(() => {
        mockProps.createFundingSource.mockClear();
      });

      it('should create a funding source for the existing contractor', async () => {
        instance.setState({ createdContractor: { id: 123 } });

        await instance.createFundingSource(fakeBankInfo);

        expect(mockProps.createFundingSource).toHaveBeenCalledWith({
          id: 123,
          data: fakeBankInfo,
        });
      });
    });
  });

  describe('events', () => {
    describe('handleSubmit', () => {
      it('should create contractor and a funding source for them, and call handleSubmitSuccess', async () => {
        const { wrapper } = initAddContractor();
        const instance = wrapper.instance();

        instance.createContractor = jest.fn();
        instance.createFundingSource = jest.fn();
        instance.handleSubmitSuccess = jest.fn();

        await instance.handleSubmit({
          firstName: 'John',
          lastName: 'Doe',
          accountNumber: 1234,
          routingNumber: 987654321,
        });

        expect(instance.createContractor).toHaveBeenCalledWith({
          firstName: 'John',
          lastName: 'Doe',
        });
        expect(instance.createFundingSource).toHaveBeenCalledWith({
          accountNumber: 1234,
          routingNumber: 987654321,
        });
        expect(instance.handleSubmitSuccess).toHaveBeenCalled();
      });

      it('should set error in state if response has an error message defined', async () => {
        const { wrapper } = initAddContractor();
        const instance = wrapper.instance();
        const fakeErrorResponse = { ...new Error(), response: { data: { error: 'fake error' } } };
        const fakeForm = { setSubmitting: jest.fn() };

        instance.createContractor = jest.fn(() => Promise.reject(fakeErrorResponse));

        await instance.handleSubmit({}, fakeForm);

        expect(instance.state.error).toBe('fake error');
        expect(fakeForm.setSubmitting).toHaveBeenCalledWith(false);
      });

      it('should not set error in state if response is not defined', async () => {
        const { wrapper } = initAddContractor();
        const instance = wrapper.instance();
        const fakeErrorResponse = new Error();
        const fakeForm = { setSubmitting: jest.fn() };

        instance.createContractor = jest.fn(() => Promise.reject(fakeErrorResponse));

        await instance.handleSubmit({}, fakeForm);

        expect(instance.state.error).toBe(null);
        expect(fakeForm.setSubmitting).toHaveBeenCalledWith(false);
      });
    });

    describe('handleSubmitSuccess', () => {
      it('should reset error in state', () => {
        const { wrapper } = initAddContractor();
        const instance = wrapper.instance();
        instance.setState({ error: 'fake error' });

        instance.handleSubmitSuccess();

        expect(instance.state.error).toBeNull();
      });

      it('should call onSubmit with created contractor', () => {
        const fakeOnSubmit = jest.fn();
        const { wrapper } = initAddContractor({ onSubmit: fakeOnSubmit });
        const instance = wrapper.instance();
        instance.setState({ createdContractor: 'fake contractor' });

        instance.handleSubmitSuccess();

        expect(fakeOnSubmit).toHaveBeenCalledWith('fake contractor');
      });
    });
  });
});
