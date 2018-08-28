/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import moment from 'moment';

import {
  makeValidationSchema,
  makeEmptyInitialValues,
  transformDateWithMoment,
} from '~utils/forms';

import DatePickerField from '~components/DatePickerField';

const dateFormat = 'YYYY/D/M';

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
  },
  postalCode: {
    label: 'Postal Code',
    validator: Yup.string()
      .ensure()
      .required()
      .matches(/\d{5}/, '${label} must be a valid zip code'),
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
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = defaults => makeEmptyInitialValues(formFields, defaults);

const transformDateToMoment = (date, format = dateFormat) => {
  if (typeof date === 'string') {
    const tryDate = moment(date, format);
    if (tryDate.isValid()) {
      return tryDate;
    }
  }

  return moment(date);
};

const transformData = ({ id, profile }) => {
  const data = Object.keys(formFields).reduce(
    (acc, fieldName) => ({ ...acc, [fieldName]: profile[fieldName] }),
    { id }
  );
  data.dateOfBirth = transformDateToMoment(profile.dateOfBirth);
  return data;
};

export { formFields, initialValues, transformData, transformDateToMoment, validationSchema };
