/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  doingBusinessAs: {
    label: 'Doing Business As',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
    },
  },
  email: {
    label: 'E-mail',
    validator: Yup.string()
      .ensure()
      .email()
      .required()
      .min(5),
    input: {
      placeholder: '',
    },
  },
  phone: {
    label: 'Phone',
    // eslint-disable-next-line
    validator: Yup.string().matches(/\d{10}/, '${label} must have 10 digits'),
    input: {
      maxLength: 12,
      placeholder: '000 000-0000',
      formatter: formUtils.formatters.phone,
      parser: formUtils.parsers.digitsOnly,
    },
  },
  address1: {
    label: 'Address 1',
    validator: Yup.string()
      .ensure()
      .required()
      .max(50),
    input: {
      placeholder: '',
    },
  },
  address2: {
    label: 'Address 2',
    validator: Yup.string()
      .max(50)
      .nullable(),
    input: {
      placeholder: '',
    },
  },
  city: {
    label: 'City',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
    },
  },
  state: {
    label: 'State',
    validator: Yup.string()
      .ensure()
      .required()
      .max(2)
      .uppercase(),
    input: {
      maxLength: 2,
      placeholder: 'e.g. CA',
      parser: formUtils.parsers.lettersOnly,
    },
  },
  postalCode: {
    label: 'Postal Code',
    validator: Yup.string()
      .required()
      .max(10, '${label} must be a valid zip code')
      .min(5, '${label} must be a valid zip code'),
    input: {
      placeholder: '12345',
    },
  },
  country: {
    label: 'Country',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      placeholder: '',
      disabled: true,
    },
  },
  website: {
    label: 'Website',
    validator: Yup.string().ensure(),
    input: {
      placeholder: '',
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
