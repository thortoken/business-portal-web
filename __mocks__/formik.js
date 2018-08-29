const { namedComponent } = require('./helpers');

const originalFormik = require.requireActual('formik');

const Formik = namedComponent('Formik');

module.exports = {
  ...originalFormik,
  Formik,
};
