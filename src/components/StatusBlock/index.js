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

    return (
      <div className="StatusBlock">
        <div
          className={classnames('StatusBlock--block', {
            [`StatusBlock--${status.toLowerCase()}`]: true,
          })}>
          {status.toUpperCase()}
        </div>
      </div>
    );
  }
}

export default StatusBlock;
