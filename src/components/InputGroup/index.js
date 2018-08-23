import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InputGroup.css';

export class InputGroup extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    label: PropTypes.string,
  };

  render() {
    const { className, children, label } = this.props;

    return (
      <div className={classNames('Input-group', className)}>
        <div className="Input-group--label">{label}</div>
        {children}
      </div>
    );
  }
}

export default InputGroup;
