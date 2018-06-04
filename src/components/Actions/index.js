import React from 'react';
import classnames from 'classnames';

import './Actions.css';

const Left = ({ children }) => <div className="Actions-left">{children}</div>;
const Right = ({ children }) => <div className="Actions-right">{children}</div>;

export default class Actions extends React.Component {
  static Left = Left;
  static Right = Right;

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
