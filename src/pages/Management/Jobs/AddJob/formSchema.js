/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  name: {
    label: 'Name',
    validator: Yup.string()
      .trim()
      .ensure()
      .required(),
    input: {
      wide: null,
    },
  },
  value: {
    label: 'Amount',
    validator: Yup.number()
      .positive()
      .required()
      .max(10000),
    input: {
      placeholder: '123.45',
      formatter: formUtils.formatters.price,
      parser: formUtils.parsers.numberAndDecimalsOnly,
      wide: null,
    },
  },
  description: {
    label: 'Description',
    validator: Yup.string()
      .trim()
      .ensure()
      .required(),
    input: {
      wide: 'true',
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
