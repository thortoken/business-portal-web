/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import moment from 'moment';

import formUtils from '~utils/forms';
import { dateAsMoment } from '~utils/time';

const dateFormat = 'MM/DD/YYYY';

const formFields = {
  profile: {
    fields: {
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
        validator: Yup.string()
          .matches(/\d{10}/, '${label} must have 10 digits')
          .required(),
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
        validator: Yup.number()
          .required()
          .max(99999, '${label} must be a valid zip code'),
        input: {
          maxLength: 5,
          placeholder: '12345',
        },
      },
      dateOfBirth: {
        label: 'Date of Birth',
        validator: Yup.date()
          .required()
          .max(moment().subtract(18, 'years'), 'Contractor must be at least 18 years old')
          .transform(formUtils.yup.dateTransformer(dateFormat)),
        input: {
          maxLength: 10,
          placeholder: 'MM/DD/YYYY',
          formatter: formUtils.formatters.date,
        },
      },
      ssn: {
        label: 'SSN',
        validator: Yup.string()
          .ensure()
          .notRequired()
          .matches(/\d{9}/, {
            message: 'Please input your full SSN',
            excludeEmptyString: true,
          })
          .transform(formUtils.yup.ssnTransformer()),
        input: {
          maxLength: 11,
          placeholder: '123-45-6789',
          formatter: formUtils.formatters.ssn,
        },
      },
    },
  },
};

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

const transformDateToMoment = dateAsMoment(dateFormat);

export { formFields, validationSchema, initialValues, transformDateToMoment };
