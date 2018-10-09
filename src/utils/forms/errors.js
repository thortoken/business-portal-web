import _ from 'lodash';
import NotificationService from '../../services/notification';

export const setErrors = (form, errors) => {
  let fields = {};
  _.forIn(errors, (value, key) => {
    fields[key] = '';
    value.forEach(msg => {
      fields[key] += msg.message.replace(`"${key}"`, 'Field');
      if (fields[key][fields[key].length - 1] !== '.') {
        fields[key] += '.';
      }
      if (value.length > 0) {
        fields[key] += ' ';
      }
    });
  });
  form.setErrors(fields);
};

export const handleFormHttpResponse = (form, errors, response) => {
  if (response && response.status === 409) {
    setErrors(form, response.data.error.profile);
    NotificationService.open({
      type: 'warning',
      message: 'Warning',
      description: 'Enter valid values.',
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
