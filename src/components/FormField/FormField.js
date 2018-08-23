import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'

import { Input } from 'antd'

export class FormField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }

  static defaultProps = {
    component: Input,
  }

  renderInput = ({ field, form }) => {
    const { component: Component, name, ...inputProps } = this.props

    const errors = form.touched[name] && form.errors[name]
    const helperText = inputProps.helperText || ''

    return (
      <Component
        {...field}
        {...inputProps}
        error={!!errors}
        helperText={errors || helperText}
      />
    )
  }

  render() {
    const { name } = this.props

    return <Field name={name} render={this.renderInput} />
  }
}

export default FormField
