/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  name: {
    label: 'Name',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  routing: {
    label: 'Bank routing number',
    validator: Yup.string()
      .ensure()
      .required()
      .max(9, 'Bank routing number must have 9 digits')
      .min(9, 'Bank routing number must have 9 digits'),
    input: {
      maxLength: 9,
      parser: formUtils.parsers.digitsOnly,
    },
  },
  account: {
    label: 'Bank account number',
    validator: Yup.string()
      .ensure()
      .required()
      .min(4, 'Bank account number must have minimum 4 digits')
      .max(17, 'Bank account number must have maximum 17 digits'),
    input: {
      maxLength: 17,
      parser: formUtils.parsers.digitsOnly,
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
