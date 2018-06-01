import React from 'react';
import classnames from 'classnames';

import './Box.css';

export default class Box extends React.Component {
  render() {
    const { className = '', transparent, padding } = this.props;

    return (
      <div
        className={classnames('Box', className, {
          'Box--transparent': transparent,
          'Box--padding': padding,
        })}>
        {this.props.children}
      </div>
    );
  }
}
