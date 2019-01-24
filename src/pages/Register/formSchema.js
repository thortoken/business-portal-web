/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  email: {
    label: 'E-mail',
    validator: Yup.string()
      .ensure()
      .email()
      .required()
      .min(5),
    input: {
      disabled: true,
    },
  },
  password: {
    label: 'Password',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      wide: null,
      type: 'password',
    },
  },
  confirmPassword: {
    label: 'Confirm',
    validator: Yup.string()
      .ensure()
      .required()
      .oneOf([Yup.ref('password')], 'Passwords are not the same!'),
    input: {
      wide: null,
      type: 'password',
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
