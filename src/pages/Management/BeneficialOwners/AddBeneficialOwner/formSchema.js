/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import moment from 'moment';

import formUtils from '~utils/forms';

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
    label: 'SSN',
    validator: Yup.string()
      .ensure()
      .required()
      .matches(/\d{9}/, 'Please input your SSN'),
    input: {
      maxLength: 9,
    },
  },
  address: {
    fields: {
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
      stateProvinceRegion: {
        label: 'State Province Region',
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
    },
  },
};

const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);
const validationSchema = formUtils.formik.makeValidationSchema(formFields);

export { formFields, validationSchema, initialValues };
