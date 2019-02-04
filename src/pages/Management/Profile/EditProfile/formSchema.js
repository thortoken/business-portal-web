/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import formUtils from '~utils/forms';

const formFields = {
  firstName: {
    label: 'First name',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
    },
  },
  lastName: {
    label: 'Last name',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
    },
  },
  email: {
    label: 'Email',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
      disabled: true,
    },
  },
  phone: {
    label: 'Phone',
    validator: Yup.string().matches(/\d{10}/, '${label} must have 10 digits'),
    input: {
      maxLength: 12,
      placeholder: '000 000-0000',
      formatter: formUtils.formatters.phone,
      parser: formUtils.parsers.digitsOnly,
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
