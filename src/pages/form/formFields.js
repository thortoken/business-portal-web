export const formFieldConstants = {
  country: {
    tooltipCSS: '522px',
    errorMsg: 'Please select a country',
    func(value) {
      if (value !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
  phone: {
    tooltipCSS: '967px',
    func(value) {
      return true;
    },
  },
  zip_code: {
    tooltipCSS: '878px',
    errorMsg: 'Please enter a zip code',
    func(value) {
      if (value !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
  us_accredited: {
    tooltipCSS: '967px',
    func(value) {
      return true;
    },
  },
  city: {
    tooltipCSS: '789px',
    errorMsg: 'Please enter a valid city',
    func(value) {
      if (value !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
  street_address: {
    tooltipCSS: '610px',
    errorMsg: 'Please enter your street address',
    func(value) {
      if (value !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
  street_address_2: {
    tooltipCSS: '700px',
    func(value) {
      return true;
    },
  },
  middle_name: {
    tooltipCSS: '360px',
    func(value) {
      return true;
    },
  },
  first_name: {
    tooltipCSS: '270px',
    errorMsg: 'First name is required',
    func(value) {
      if (value !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
  neo_wallet: {
    tooltipCSS: '181px',
    errorMsg: 'Please enter a valid NEO address',
    func(value) {
      const re = new RegExp('A[0-9a-zA-Z]{33}', 'g');
      if (value !== '' && re.test(value)) {
        return true;
      } else {
        return false;
      }
    },
  },
  dollar_contribution: {
    tooltipCSS: '92px',
    errorMsg: 'Please enter a valid dollar amount',
    func(value) {
      var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
      if (value !== '' && regex.test(value)) {
        return true;
      } else {
        return false;
      }
    },
  },
  last_name: {
    tooltipCSS: '448px',
    errorMsg: 'Please enter your last name',
    func(value) {
      if (value !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
};
