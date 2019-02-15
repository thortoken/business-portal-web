/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  amount1: {
    label: 'First Amount',
    validator: Yup.number()
      .positive()
      .required(),
    input: {
      placeholder: '123.45$',
      formatter: formUtils.formatters.price,
      parser: formUtils.parsers.numberAndDecimalsOnly,
    },
  },
  amount2: {
    label: 'Second Amount',
    validator: Yup.number()
      .positive()
      .required(),
    input: {
      placeholder: '123.45$',
      formatter: formUtils.formatters.price,
      parser: formUtils.parsers.numberAndDecimalsOnly,
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
