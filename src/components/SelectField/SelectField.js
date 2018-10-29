import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class SelectField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
  };
  handleChange = value => {
    const { name, onChange, onSelect } = this.props;
    onChange(name)(value);
    if (onSelect) {
      onSelect({ value, name });
    }
  };
  handleBlur = value => {
    const { onBlur } = this.props;
    onBlur(value);
  };
  render() {
    return (
      <Select {...this.props} onChange={this.handleChange}>
        {this.props.dataSource}
      </Select>
    );
  }
}
export default SelectField;
