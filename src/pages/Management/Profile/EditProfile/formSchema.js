/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import formUtils from '~utils/forms';

const formFields = {
  firstName: {
    label: 'First name',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
    },
  },
  lastName: {
    label: 'Last name',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
    },
  },
  email: {
    label: 'Email',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
      disabled: true,
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
