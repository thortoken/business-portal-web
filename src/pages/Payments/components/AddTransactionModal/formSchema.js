/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms/formik';

const formFields = {
  name: {
    label: 'Name',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  value: {
    label: 'Value',
    validator: Yup.number()
      .positive()
      .required(),
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
