/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms/formik';

const formFields = {
  name: {
    label: 'Name',
    validator: Yup.string()
      .trim()
      .ensure()
      .required(),
  },
  value: {
    label: 'Value',
    validator: Yup.number()
      .positive()
      .required(),
    input: {
      placeholder: '123.45',
      formatter: formUtils.formatters.price,
      parser: formUtils.parsers.numberAndDecimalsOnly,
    },
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
