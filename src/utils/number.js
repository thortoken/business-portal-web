import { formatNumber } from 'libphonenumber-js';

export const formatCurrency = (
  value,
  { currency = null, precision = 2, locale = 'en-US' } = {}
) => {
  let options = { minimumFractionDigits: precision, maximumFractionDigits: precision };
  if (currency === null) {
    options.style = 'decimal';
  } else {
    options.style = 'currency';
    options.currency = currency;
  }
  return Number(value).toLocaleString(locale, options);
};

export const formatUsd = value => formatCurrency(value, { currency: 'USD', precision: 2 });
export const formatThor = value =>
  `${formatCurrency(Math.floor(value), { currency: null, precision: 0 })} THOR`;

export const formatPhone = value => formatNumber({ country: 'US', phone: value }, 'National');
