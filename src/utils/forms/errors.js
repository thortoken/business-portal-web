import _ from 'lodash';
import NotificationService from '../../services/notification';

export const setFormErrors = (form, errors) => {
  if (Array.isArray(errors)) {
    _.forIn(errors, (value, inputName) => {
      if (Array.isArray(value)) {
        let error = prepareError(value, inputName);
        form.setFieldError(inputName, error);
      } else {
        _.forIn(value, (val, name) => {
          let err = prepareError(val, name);
          form.setFieldError(name, err);
        });
      }
    });
    return null;
  } else {
    return errors;
  }
};

export const prepareError = (value, inputName) => {
  let error = '';
  value.forEach(msg => {
    error += msg.message.replace(`"${inputName}"`, 'Field');
    if (error[error.length - 1] !== '.') {
      error += '. ';
    }
  });
  return error;
};

export const handleFormHttpResponse = (form, errors, response) => {
  if (response && response.status === 409) {
    let errorMsg = 'Enter valid values.';
    const singleError = setFormErrors(form, errors);
    if (singleError) {
      errorMsg = singleError;
    }
    NotificationService.open({
      type: 'warning',
      message: 'Warning',
      description: errorMsg,
    });
  } else if (response && response.status >= 500) {
    NotificationService.open({
      type: 'error',
      message: 'Error',
      description: 'Internal server error. Try again.',
    });
  }
  form.setSubmitting(false);
};
