/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import moment from 'moment';

import formUtils from '~utils/forms';
import { dateAsMoment } from '~utils/time';

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
    },
  },
  postalCode: {
    label: 'Postal Code',
    validator: Yup.number()
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
  dateOfBirth: {
    label: 'Date of Birth',
    validator: Yup.date()
      .required()
      .max(moment().subtract(18, 'years'), 'Contractor must be at least 18 years old')
      .transform(formUtils.yup.dateTransformer(dateFormat)),
    input: {
      allowClear: false,
      component: DatePickerField,
      format: dateFormat,
    },
  },
  ssn: {
    label: 'Last 4 digits of SSN',
    validator: Yup.string()
      .ensure()
      .required()
      .matches(/\d{4}/, 'Please input last 4 digits of your SSN'),
    input: {
      maxLength: 4,
    },
  },
  routingNumber: {
    label: 'Bank routing number',
    validator: Yup.string()
      .ensure()
      .required()
      .max(9, 'Bank routing number must have 9 digits')
      .min(9, 'Bank routing number must have 9 digits'),
    input: {
      maxLength: 9,
    },
  },
  accountNumber: {
    label: 'Bank account number',
    validator: Yup.string()
      .ensure()
      .required()
      .min(3, 'Bank account number must have minimum 3 digits')
      .max(17, 'Bank account number must have maximum 17 digits'),
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

const transformDateToMoment = dateAsMoment(dateFormat);

export { formFields, validationSchema, initialValues, transformDateToMoment };
