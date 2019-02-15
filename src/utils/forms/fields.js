import * as Yup from 'yup';
import formUtils from '~utils/forms';

export const firstName = {
  label: 'First name',
  validator: Yup.string()
    .ensure()
    .required(),
};

export const lastName = {
  label: 'First name',
  validator: Yup.string()
    .ensure()
    .required(),
};

export const email = {
  label: 'E-mail',
  validator: Yup.string()
    .ensure()
    .email()
    .required()
    .min(5),
};

export const phone = {
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
};

export const address1 = {
  label: 'Address 1',
  validator: Yup.string()
    .ensure()
    .required()
    .max(50),
};

export const address2 = {
  label: 'Address 2',
  validator: Yup.string()
    .max(50)
    .nullable(),
};
