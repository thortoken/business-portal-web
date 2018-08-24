import * as Yup from "yup";
import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const formFields = {
  email: {
    label: 'E-mail',
    validator: Yup.string()
      .ensure()
      .required()
      .email()
      .min(6),
    input: {
      type: 'email',
      placeholder: 'Enter your email',
    },
  },
  password: {
    label: 'Password',
    validator: Yup.string()
      .ensure()
      .required(),
    input: {
      type: 'password',
      placeholder: 'Enter your password',
    },
  },
};

const validationSchema = makeValidationSchema(formFields);
const initialValues = makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
