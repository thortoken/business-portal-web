/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

import formUtils from '~utils/forms';

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
  title: {
    label: 'Title',
    validator: Yup.string()
      .ensure()
      .required(),
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
          .max(99999 - 9999, '${label} must be a valid zip code'),
        input: {
          maxLength: 9,
          minLength: 5,
          placeholder: '12345',
        },
      },
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);

export { formFields, validationSchema };
