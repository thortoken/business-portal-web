import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Input } from 'antd';

import InputGroup from '~components/InputGroup';

export class FormField extends Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    formatter: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    parser: PropTypes.func,
  };

  static defaultProps = {
    component: Input,
  };

  renderInput = ({ field, form }) => {
    const {
      component: Component,
      className,
      name,
      label,
      formatter,
      parser,
      ...inputProps
    } = this.props;

    let { value } = field;
    // Format the displayed value.
    if (typeof formatter === 'function') {
      value = formatter(value);
    }

    let { onChange } = field;
    // Parse back the formatted value just before sending it to Formik.
    if (typeof parser === 'function') {
      onChange = evt => {
        evt.target.value = parser(evt.target.value);
        return field.onChange(evt);
      };
    }

    const errors = form.touched[name] && form.errors[name];

    return (
      <InputGroup className={className} errors={errors} label={label}>
        <Component name={name} {...field} value={value} onChange={onChange} {...inputProps} />
      </InputGroup>
    );
  };

  render() {
    const { name } = this.props;

    return <Field name={name} render={this.renderInput} />;
  }
}

export default FormField;
