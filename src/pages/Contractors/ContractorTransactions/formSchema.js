/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms/formik';

const formFields = {
  location: {
    label: 'Location',
    validator: Yup.string()
      .trim()
      .ensure()
      .required(),
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
