import moment from 'moment';

export const dateTransformer = format =>
  function(currentValue, originalValue) {
    if (this.isType(currentValue)) {
      return currentValue;
    }

    const date = moment(originalValue, format);
    return date.isValid() ? date.toDate() : new Date();
  };
