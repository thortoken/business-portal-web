/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';
import { dateAsMoment } from '~utils/time';

const dateFormat = 'YYYY-MM-DD';

const formFields = {
  routing: {
    label: 'Bank routing number',
    validator: Yup.string()
      .ensure()
      .required()
      .max(9)
      .min(9),
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
      .min(4),
    input: {
      parser: formUtils.parsers.digitsOnly,
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

const transformDateToMoment = dateAsMoment(dateFormat);

export { formFields, validationSchema, initialValues, transformDateToMoment };
