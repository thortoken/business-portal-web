/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import moment from 'moment';

import formUtils from '~utils/forms';
import { dateAsMoment } from '~utils/time';

const dateFormat = 'MM/DD/YYYY';

const companyFormFields = {
  company: {
    fields: {
      businessType: {
        label: 'Business Type',
        validator: Yup.string()
          .ensure()
          .required(),
      },
      businessClassification: {
        label: 'Business Classification',
        validator: Yup.string()
          .ensure()
          .required(),
      },
      businessName: {
        label: 'Business Name',
        validator: Yup.string()
          .ensure()
          .required(),
      },
      doingBusinessAs: {
        label: 'Doing Business As',
        validator: Yup.string().nullable(),
      },
      address1: {
        label: 'Address 1',
        validator: Yup.string()
          .ensure()
          .required()
          .max(50),
        input: {
          placeholder: 'Street number, street name',
        },
      },
      address2: {
        label: 'Address 2',
        validator: Yup.string()
          .max(50)
          .nullable(),
        input: {
          placeholder: 'Apartment, floor, suite, bldg. #',
        },
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
      website: {
        label: 'Website',
        validator: Yup.string().nullable(),
      },
      phone: {
        label: 'Phone',
        validator: Yup.string()
          .notRequired()
          .matches(/\d{10}/, {
            message: '${label} must have 10 digits',
            excludeEmptyString: true,
          }),
        input: {
          maxLength: 12,
          placeholder: '000 000-0000',
          formatter: formUtils.formatters.phone,
          parser: formUtils.parsers.digitsOnly,
        },
      },
      ein: {
        label: 'E.I.N.',
        validator: Yup.string()
          .nullable()
          .when('businessType', {
            is: val => val !== 'soleProprietorship',
            then: Yup.string()
              .ensure()
              .required(),
          }),
        input: {
          maxLength: 10,
          placeholder: '00-0000000',
          formatter: formUtils.formatters.ein,
        },
      },
    },
  },
  owner: {
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
        label: 'Last 4 digits of SSN',
        validator: Yup.string()
          .nullable()
          .matches(/\d{4}/, {
            message: 'Please input last 4 digits of your SSN',
            excludeEmptyString: true,
          }),
        input: {
          maxLength: 4,
        },
      },
    },
  },
};

const controllerFormFields = {
  controller: {
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
      title: {
        label: 'Title',
        validator: Yup.string()
          .ensure()
          .required(),
      },
      ssn: {
        label: 'Last 4 digits of SSN',
        validator: Yup.string()
          .ensure()
          .matches(/\d{4}/, {
            message: 'Please input last 4 digits of your SSN',
            excludeEmptyString: true,
          }),
        input: {
          maxLength: 4,
        },
      },
      dateOfBirth: {
        label: 'Date of Birth',
        validator: Yup.date()
          .max(moment().subtract(18, 'years'), 'Contractor must be at least 18 years old')
          .transform(formUtils.yup.dateTransformer(dateFormat)),
        input: {
          maxLength: 10,
          placeholder: 'MM/DD/YYYY',
          formatter: formUtils.formatters.date,
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
            input: {
              placeholder: 'Apartment, floor, suite, bldg. #',
            },
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
              .nullable()
              .max(99999, '${label} must be a valid zip code'),
            input: {
              maxLength: 5,
              placeholder: '12345',
            },
          },
        },
      },
    },
  },
};

const prepareFormFieldsAndValidation = (type, values) => {
  let validationSchema, initialValues, formFields;
  if (type === 'soleProprietorship') {
    formFields = { ...companyFormFields };
  } else {
    formFields = { ...companyFormFields, ...controllerFormFields };
  }
  validationSchema = formUtils.formik.makeValidationSchema(formFields);
  initialValues = formUtils.formik.makeEmptyInitialValues(formFields);
  initialValues = { ...initialValues, ...values };
  return {
    validationSchema,
    initialValues,
    formFields,
  };
};
const transformDateToMoment = dateAsMoment(dateFormat);

export { prepareFormFieldsAndValidation, transformDateToMoment };
