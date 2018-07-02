import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Box.css';

export default class Box extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    transparent: PropTypes.bool,
    padding: PropTypes.bool,
  };

  render() {
    const { children, className, transparent, padding } = this.props;

    return (
      <div
        className={classnames('Box', {
          [className]: className,
          'Box--transparent': transparent,
          'Box--padding': padding,
        })}>
        {children}
      </div>
    );
  }
}
