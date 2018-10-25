import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';

const { Option, OptGroup } = Select;

class SelectField extends React.Component {
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
      <Select {...this.props} onChange={this.handleChange}>
        <Option name={name} value={value} autoComplete="off" onBlur={this.handleBlur} />
      </Select>
    );
  }
}
export default SelectField;
