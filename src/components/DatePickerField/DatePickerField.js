import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

class DatePickerField extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    format: 'YYYY-MM-DD',
  };

  handleChange = (date, dateStr) => {
    const { name, onChange } = this.props;
    onChange(name)(dateStr);
  };

  render() {
    const { format, value, ...inputProps } = this.props;

    return (
      <DatePicker
        {...inputProps}
        format={format}
        onChange={this.handleChange}
        value={value ? moment(value, format) : moment()}
        onBlur={undefined}
      />
    );
  }
}

export default DatePickerField;
