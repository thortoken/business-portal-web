/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms/formik';

const formFields = {
  jobId: {
    label: 'Jobs',
    validator: Yup.string().ensure(),
    input: {
      wide: null,
    },
  },
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
      // formatter: formUtils.formatters.price,
      parser: formUtils.parsers.numberAndDecimalsOnly,
    },
  },
  description: {
    label: 'Description',
    validator: Yup.string()
      .trim()
      .ensure(),
    input: {
      wide: 'true',
    },
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields);

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
