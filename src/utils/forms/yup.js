import moment from 'moment';

export const dateTransformer = format =>
  function(currentValue, originalValue) {
    if (this.isType(currentValue)) {
      return currentValue;
    }

    const date = moment.utc(originalValue, format);
    return date.isValid() ? date.toDate() : new Date();
  };

export const ssnTransformer = () =>
  function(currentValue, originalvalue) {
    return this.isType(currentValue) && currentValue !== null
      ? currentValue.replace(/\D/g, '')
      : currentValue;
  };
