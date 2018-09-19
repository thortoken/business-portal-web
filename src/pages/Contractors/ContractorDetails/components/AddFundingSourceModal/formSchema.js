/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms/formik';

const formFields = {
  ssn: {
    label: 'Last 4 digits of SSN',
    validator: Yup.string()
      .ensure()
      .required()
      .matches(/\d{4}/, 'Please input last 4 digits of your SSN'),
    input: {
      maxLength: 4,
    },
  },
  routingNumber: {
    label: 'Bank routing number',
    validator: Yup.string()
      .ensure()
      .required()
      .max(9)
      .min(9),
    input: {
      maxLength: 9,
    },
  },
  accountNumber: {
    label: 'Bank account number',
    validator: Yup.string()
      .ensure()
      .required()
      .min(4),
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
