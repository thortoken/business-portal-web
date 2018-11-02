// 1234567890 => 123 456-7890
export const phone = value =>
  value &&
  value.toString().replace(/^(\d{3})(\d{1,3})(\d{0,})$/, (all, g1, g2, g3) => {
    if (g3) {
      return `${g1} ${g2}-${g3}`;
    }
    if (g2) {
      return `${g1} ${g2}`;
    }
    return `${g1}`;
  });

export const ssn = value =>
  value &&
  value.toString().replace(/^(\d{3})(\d{0,2})(\d{0,4})$/, (all, g1, g2, g3) => {
    if (g3) {
      return `${g1}-${g2}-${g3}`;
    }
    if (g2) {
      return `${g1}-${g2}`;
    }
    return `${g1}`;
  });

export const price = value => {
  if (/^\d.*/.test(value)) {
    // check if first chracter is a digit
    value = value.replace(/[^0-9.,]+/g, ''); // don't allow non digit or ',', '.'

    value = value.toString();
    if (value.includes(',')) {
      value = value.replace(',', '.'); // replace ',' => '.'
    }
    if (value.includes('.')) {
      // allow only two decimal digits
      let splited = value.split('.');

      if (splited[1].length > 2) {
        splited[1] = splited[1].substring(0, 2);
        value = Number(splited.join('.')).toFixed(2);
      }
    }
    if (value.split('.').length - 1 > 1) {
      value = value.replace(/.([^.]*)$/, '$1'); // allow only one '.'
      return value && Number(value).toFixed(2);
    } else {
      return value;
    }
  }
};
