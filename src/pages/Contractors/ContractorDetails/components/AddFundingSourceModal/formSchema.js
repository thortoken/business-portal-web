/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms/formik';

const formFields = {
  routingNumber: {
    label: 'Bank routing number',
    validator: Yup.string()
      .ensure()
      .required()
      .max(9, 'Bank routing number must have 9 digits')
      .min(9, 'Bank routing number must have 9 digits'),
    input: {
      maxLength: 9,
    },
  },
  accountNumber: {
    label: 'Bank account number',
    validator: Yup.string()
      .ensure()
      .required()
      .min(3, 'Bank account number must have minimum 3 digits')
      .max(17, 'Bank account number must have maximum 17 digits'),
    input: {
      maxLength: 17,
    },
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
