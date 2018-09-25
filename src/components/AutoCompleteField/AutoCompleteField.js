import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Input } from 'antd';

class AutoCompleteField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = value => {
    const { name, onChange } = this.props;
    onChange(name)(value);
  };

  handleBlur = value => {
    const { onBlur } = this.props;
    onBlur(value);
  };

  render() {
    const { name, value } = this.props;
    return (
      <AutoComplete {...this.props} onChange={this.handleChange}>
        <Input name={name} value={value} autoComplete="off" onBlur={this.handleBlur} />
      </AutoComplete>
    );
  }
}

export default AutoCompleteField;
