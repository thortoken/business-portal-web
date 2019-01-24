import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './StatusBlock.scss';

export class StatusBlock extends React.Component {
  static propTypes = {
    status: PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: 'white',
    className: null,
    transparent: false,
    padding: false,
  };

  render() {
    const { status } = this.props;

    let newStatus = status;
    switch (status.toLowerCase()) {
      case 'bank':
      case 'tax':
      case 'document':
        newStatus = 'pending';
        break;
    }

    return (
      <div className="StatusBlock">
        <div
          className={classnames('StatusBlock--block', {
            [`StatusBlock--${newStatus.toLowerCase()}`]: true,
          })}>
          {newStatus.toUpperCase()}
        </div>
      </div>
    );
  }
}

export default StatusBlock;
