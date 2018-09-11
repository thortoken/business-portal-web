import * as Yup from 'yup';
import formUtils from '~utils/forms';

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

const validationSchema = formUtils.formik.makeValidationSchema(formFields);
const initialValues = formUtils.formik.makeEmptyInitialValues(formFields);

export { formFields, validationSchema, initialValues };
