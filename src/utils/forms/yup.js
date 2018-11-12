import moment from 'moment';

export const dateTransformer = format =>
  function(currentValue, originalValue) {
    if (this.isType(currentValue)) {
      return currentValue;
    }

    const date = moment.utc(originalValue, format);
    return date.isValid() ? date.toDate() : new Date();
  };
