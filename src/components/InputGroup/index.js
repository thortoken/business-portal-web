import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InputGroup.css';

export class InputGroup extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    errors: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    label: PropTypes.string,
  };

  render() {
    const { className, children, errors, label } = this.props;

    return (
      <div className={classNames('InputGroup', className)}>
        <div className="InputGroup-label">{label}</div>
        {children}
        {errors && <div className="InputGroup-errors">{errors}</div>}
      </div>
    );
  }
}

export default InputGroup;
