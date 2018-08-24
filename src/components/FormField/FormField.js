import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Input } from 'antd';

import InputGroup from '~components/InputGroup';

export class FormField extends Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    component: Input,
  };

  renderInput = ({ field, form }) => {
    const { component: Component, className, name, label, ...inputProps } = this.props;

    const errors = form.touched[name] && form.errors[name];

    return (
      <InputGroup className={className} errors={errors} label={label}>
        <Component name={name} {...field} {...inputProps} />
      </InputGroup>
    );
  };

  render() {
    const { name } = this.props;

    return <Field name={name} render={this.renderInput} />;
  }
}

export default FormField;
