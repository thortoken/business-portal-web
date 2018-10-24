import * as Yup from 'yup';

import formUtils from '~utils/forms';

const formFields = {
  businessName: {
    label: 'Business Name',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  doingBusinessAs: {
    label: 'Doing Business As',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  firstName: {
    label: 'First name',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  lastName: {
    label: 'Last name',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  email: {
    label: 'E-mail',
    validator: Yup.string()
      .ensure()
      .email()
      .required()
      .min(5),
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
  address1: {
    label: 'Address 1',
    validator: Yup.string()
      .ensure()
      .required()
      .max(50),
  },
  address2: {
    label: 'Address 2',
    validator: Yup.string()
      .max(50)
      .nullable(),
  },
  city: {
    label: 'City',
    validator: Yup.string()
      .ensure()
      .required(),
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
      .max(99999, '${label} must be a valid zip code'),
    input: {
      maxLength: 5,
      placeholder: '12345',
    },
  },
  country: {
    label: 'Country',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  website: {
    label: 'Website',
    validator: Yup.string().ensure(),
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);

export { formFields, validationSchema };
