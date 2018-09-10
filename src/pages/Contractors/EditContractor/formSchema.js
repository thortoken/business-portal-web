/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import moment from 'moment';

import { makeValidationSchema, makeEmptyInitialValues, yupDateTransformer } from '~utils/forms';
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
      .transform(yupDateTransformer(dateFormat)),
    input: {
      allowClear: false,
      component: DatePickerField,
      format: dateFormat,
    },
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = defaults => makeEmptyInitialValues(formFields, defaults);

const transformDateToMoment = dateAsMoment(dateFormat);

const transformData = ({ id, tenantProfile }) => {
  const data = Object.keys(formFields).reduce(
    (acc, fieldName) => ({ ...acc, [fieldName]: tenantProfile[fieldName] }),
    { id }
  );
  data.dateOfBirth = transformDateToMoment(tenantProfile.dateOfBirth);
  return data;
};

export { formFields, initialValues, transformData, transformDateToMoment, validationSchema };
