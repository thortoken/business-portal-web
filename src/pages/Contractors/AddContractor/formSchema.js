/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import moment from 'moment';

import {
  makeValidationSchema,
  makeEmptyInitialValues,
  transformDateWithMoment,
} from '~utils/forms';

import DatePickerField from '~components/DatePickerField';

const dateFormat = 'MM/DD/YY';

const formFields = {
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
      placeholder: '(000) 000-0000',
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
    validator: Yup.string().max(50),
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
      placeholder: 'AB',
    },
  },
  postalCode: {
    label: 'Postal Code',
    validator: Yup.string()
      .ensure()
      .required()
      .matches(/\d{5}/, '${label} must be a valid zip code'),
    input: {
      placeholder: '12345',
    },
  },
  country: {
    label: 'Country',
    validator: Yup.string()
      .ensure()
      .required(),
  },
  dateOfBirth: {
    label: 'Date of Birth',
    validator: Yup.date()
      .required()
      .max(moment().subtract(18, 'years'), 'You must be at least 18 years old to proceed')
      .transform(transformDateWithMoment(dateFormat)),
    input: {
      allowClear: false,
      component: DatePickerField,
      format: dateFormat,
    },
  },
  routingNumber: {
    label: 'Bank routing number',
    validator: Yup.string()
      .ensure()
      .required()
      .min(9),
  },
  accountNumber: {
    label: 'Bank account number',
    validator: Yup.string()
      .ensure()
      .required()
      .min(4),
  },
  ssn: {
    label: 'Last 4 digits of SSN',
    validator: Yup.string()
      .ensure()
      .required()
      .matches(/\d{4}/, 'Please input last 4 digits of your SSN'),
    input: {
      placeholder: '0000',
    },
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields, {
  dateOfBirth: moment().format(dateFormat),
});

export { formFields, validationSchema, initialValues };
