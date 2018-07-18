import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Box.css';

export default class Box extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    transparent: PropTypes.bool,
    padding: PropTypes.bool,
  };

  static defaultProps = {
    backgroundColor: 'white',
    className: null,
    transparent: false,
    padding: false,
  };

  render() {
    const { children, className, backgroundColor, transparent, padding } = this.props;

    return (
      <div
        className={classnames('Box', {
          [className]: className,
          [`Box--bg-${backgroundColor}`]: true,
          'Box--transparent': transparent,
          'Box--padding': padding,
        })}>
        {children}
      </div>
    );
  }
}
