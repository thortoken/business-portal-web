/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  jobId: {
    label: 'Jobs',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      wide: null,
    },
  },
  value: {
    label: 'Value',
    validator: Yup.number()
      .positive()
      .required(),
    input: {
      placeholder: '123.45',
      parser: formUtils.parsers.numberAndDecimalsOnly,
      wide: null,
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

const prepareFormFieldsAndValidation = values => {
  let validationSchema, initialValues;
  validationSchema = formUtils.formik.makeValidationSchema(formFields);
  initialValues = formUtils.formik.makeEmptyInitialValues(formFields);
  initialValues = { ...initialValues, ...values };
  return {
    validationSchema,
    initialValues,
    formFields,
  };
};

export { formFields, validationSchema, initialValues, prepareFormFieldsAndValidation };
