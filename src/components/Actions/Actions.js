import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Actions.scss';

const Left = ({ children }) => <div className="Actions-left">{children}</div>;
const Right = ({ children }) => <div className="Actions-right">{children}</div>;

export class Actions extends React.Component {
  static Left = Left;
  static Right = Right;

  static propTypes = {
    position: PropTypes.oneOf(['top', 'bottom']).isRequired,
  };

  render() {
    const { position, children } = this.props;
    return (
      <div
        className={classnames('Actions', {
          [`Actions--${position}`]: true,
        })}>
        {children}
      </div>
    );
  }
}

export default Actions;
