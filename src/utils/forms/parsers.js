export const digitsOnly = value => value && value.toString().replace(/[^\d]/g, '');

export const lettersOnly = value => value && value.toString().replace(/[^a-z]/g, '');

export const numberAndDecimalsOnly = value =>
  value && value.toString().replace('^[0-9]{1,6}(\\.\\\\,\\d{1,2})?$', '');
