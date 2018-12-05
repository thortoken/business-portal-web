/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  oldPassword: {
    label: 'Old Password',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      wide: 'true',
      type: 'password',
    },
  },
  newPassword: {
    label: 'New Password',
    validator: Yup.string()
      .ensure()
      .required()
      .min(10),
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
      .oneOf([Yup.ref('newPassword')], 'Passwords are not the same!')
      .min(10),
    input: {
      wide: null,
      type: 'password',
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
